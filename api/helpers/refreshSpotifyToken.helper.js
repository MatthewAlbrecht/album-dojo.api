const REFRESH_URL = require('../../utils/spotify')
const authService = require('../services/auth.service')

module.exports = async (spotifyAccessToken, userId, redis) => {
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
    url: REFRESH_URL,
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
  return {
    spotifyAccessToken: refreshData.access_token,
    applicationAccessToken,
  }
}
