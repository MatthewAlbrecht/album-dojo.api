const validateToken = require('../policies/validateToken')
const { User, Role, Permission } = require('../models')
const domainHelper = require('./requestDomain.helper')
module.exports = async req => {
  const tokenValidation = validateToken(req)
  const domain = domainHelper(req.get('origin'), req.get('postman-origin'))

  console.log('\n\n\n')
  console.log('Is Token Valid:', tokenValidation.valid)
  console.log('Is Postman Request:', !!req.get('postman-origin'))
  console.log('Request Domain:', domain)
  console.log('\n\n\n')

  if (tokenValidation.valid) {
    let user = await User.findByPk(tokenValidation.token.id, {
      include: [
        {
          model: Role,
          attributes: ['name'],
          include: [
            {
              model: Permission,
              attributes: ['name'],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    })

    user = user.toJSON()
    const roleObject = user.Role
    delete user.Role

    return {
      tokenValidation,
      user: user,
      role: user.role,
      permissions: roleObject.Permissions.map(permission => permission.name),
      domain,
    }
  } else {
    return {
      tokenValidation,
    }
  }
}
