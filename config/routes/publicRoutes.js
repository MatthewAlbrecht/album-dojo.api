const spotifyAuthenticationMiddlware = require('../../api/middleware/spotifyAuthentication.middleware')
const validateTokenMiddleware = require('../../api/middleware/validateToken.middleware')

const publicRoutes = {
  'POST /validate': 'AuthController.validate',
  'POST /spotifyLogin': {
    path: 'AuthController.spotifyLogin',
    middlewares: [spotifyAuthenticationMiddlware],
  },
  'POST /spotifySignup': {
    path: 'AuthController.spotifySignup',
    middlewares: [spotifyAuthenticationMiddlware],
  },
  'POST /spotifyConnect': {
    path: 'AuthController.spotifyConnect',
    middlewares: [validateTokenMiddleware, spotifyAuthenticationMiddlware],
  },
  'POST /spotifyRefresh': {
    path: 'AuthController.spotifyRefresh',
  },
}

module.exports = publicRoutes
