var rp = require('request-promise')
const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'
const spotifyUserUrl = 'https://api.spotify.com/v1/me'

module.exports = async (req, res, next) => {
  let code = req.query.code || null
  let authOptions = {
    url: spotifyTokenUrl,
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
      code: code,
      redirect_uri: 'http://localhost:1333/',
      grant_type: 'authorization_code',
    },
    json: true,
  }

  let tokenRequestResponse, spotifyUser
  try {
    tokenRequestResponse = await rp(authOptions)
  } catch (error) {
    next(error)
  }

  const { access_token, refresh_token } = tokenRequestResponse
  let userRequestOptions = {
    url: spotifyUserUrl,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    json: true,
  }

  try {
    spotifyUser = await rp(userRequestOptions)
  } catch (error) {
    next(error)
  }

  res.locals.spotifyUser = spotifyUser
  res.locals.spotifyAccessToken = access_token
  res.locals.spotifyRefreshToken = refresh_token
  next()
}
