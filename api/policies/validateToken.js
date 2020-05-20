const JWTService = require('../services/auth.service')

// usually: "Authorization: Bearer [token]" or "token: [token]"
module.exports = req => {
  let tokenToVerify

  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ')

    if (parts.length === 2) {
      const scheme = parts[0]
      const credentials = parts[1]

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials
      } else {
        return { valid: false, err: 'Format for Authorization: Bearer [token]' }
      }
    } else {
      return { valid: false, err: 'Format for Authorization: Bearer [token]' }
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token
    delete req.query.token
  } else {
    return { valid: false, err: 'No Authorization was found' }
  }

  return JWTService().verify(tokenToVerify, (err, thisToken) => {
    if (err) return { valid: false, err }
    req.token = thisToken
    return { valid: true, token: thisToken }
  })
}
