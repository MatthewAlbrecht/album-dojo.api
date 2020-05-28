const generator = require('generate-password')
const get = require('lodash.get')
var rp = require('request-promise')
const { User } = require('../models')
const authService = require('../services/auth.service')

const AuthController = () => {
  const spotifyLogin = async (req, res, next) => {
    let searchedUser
    const {
      spotifyUser: { id: spotifyId },
      spotifyAccessToken,
      spotifyRefreshToken,
    } = res.locals
    const { redis } = req

    try {
      searchedUser = await User.findOne({ where: { spotifyId } })
    } catch (error) {
      next(error)
    }

    if (searchedUser) {
      redis.set(`user:${searchedUser.id}`, spotifyRefreshToken)
      const applicationAccessToken = authService().issue({
        id: searchedUser.id,
      })
      return res.send({
        spotifyAccessToken,
        applicationAccessToken,
        user: searchedUser,
      })
    }

    return res.send({ error: 'No user found' }).status(400)
  }

  const spotifySignup = async (req, res, next) => {
    let searchedUser, createdUser
    const {
      spotifyUser: { id: spotifyId, email },
      spotifyAccessToken,
      spotifyRefreshToken,
    } = res.locals
    const { redis } = req

    try {
      searchedUser = await User.findOne({ where: { spotifyId } })
    } catch (error) {
      next(error)
    }

    if (searchedUser) {
      return res.send({ error: 'User already exists' }).status(400)
    }

    try {
      createdUser = await User.create({
        email,
        spotifyId,
        password: generatePassword(),
      })
    } catch (error) {
      next(error)
    }

    redis.set(`user:${createdUser.id}`, spotifyRefreshToken)
    const applicationAccessToken = authService().issue({ id: createdUser.id })
    return res.send({
      spotifyAccessToken,
      applicationAccessToken,
      user: createdUser,
    })
  }

  const spotifyConnect = async (req, res, next) => {
    let searchedUser
    const {
      spotifyUser: { id: spotifyId },
      spotifyAccessToken,
      spotifyRefreshToken,
    } = res.locals
    console.log(spotifyId, spotifyAccessToken, spotifyRefreshToken)
    const { redis, apolloContext } = req
    const userId = get(apolloContext, 'user.id')

    try {
      searchedUser = await User.findByPk(userId)
    } catch (error) {
      next(error)
    }

    if (searchedUser) {
      searchedUser.spotifyId = spotifyId
      try {
        await searchedUser.save()
      } catch (error) {
        return next(error)
      }
      redis.set(`user:${searchedUser.id}`, spotifyRefreshToken)
      const applicationAccessToken = authService().issue({
        id: searchedUser.id,
      })
      return res.send({
        spotifyAccessToken,
        applicationAccessToken,
        user: searchedUser,
      })
    }

    return res.send({ error: 'No user found' }).status(400)
  }

  const spotifyRefresh = async (req, res, next) => {
    const refreshUrl = 'https://accounts.spotify.com/api/token'
    const {
      redis,
      body: { spotifyAccessToken, userId },
    } = req
    let refresh_token
    try {
      refresh_token = await redis.get(`user:${userId}`)
    } catch (error) {
      return next(error)
    }
    if (!spotifyAccessToken) {
      return res.status(400).send({ error: 'Must send spotify access token' })
    }

    const options = {
      url: refreshUrl,
      method: 'POST',
      headers: {
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ':' +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      },
      json: true,
    }

    let refreshData
    try {
      refreshData = await rp(options)
    } catch (error) {
      return next(error)
    }

    const applicationAccessToken = authService().issue({ id: userId })
    return res.send({
      spotifyAccessToken: refreshData.access_token,
      applicationAccessToken,
    })
  }

  const generatePassword = () =>
    generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
    })

  const validate = (req, res) => {
    const { token } = req.body

    authService().verify(token, err => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' })
      }

      return res.status(200).json({ isvalid: true })
    })
  }

  return {
    validate,
    spotifyLogin,
    spotifyConnect,
    spotifySignup,
    spotifyRefresh,
  }
}

module.exports = AuthController
