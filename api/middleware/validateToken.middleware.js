const get = require('lodash.get')

module.exports = (req, res, next) => {
  if (get(req, 'apolloContext.tokenValidation.valid')) {
    next()
  } else {
    console.log('req.apolloContext ==='.toUpperCase(), req.apolloContext)
    res.status(401)
    res.send({ error: 'Must be logged into a valid session' })
  }
}
