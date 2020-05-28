const {
  DOMAINS,
  ADMIN_DOMAIN,
  MAIN_SITE_DOMAIN,
} = require('../../utils/constants')

module.exports = (origin, postmanOrigin) => {
  switch (origin || postmanOrigin) {
    case ADMIN_DOMAIN:
      return DOMAINS.ADMIN_UI
    case MAIN_SITE_DOMAIN:
      return DOMAINS.MAIN_SITE
    default:
      return DOMAINS.ADMIN_UI
  }
}
