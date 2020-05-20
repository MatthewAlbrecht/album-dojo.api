const validateToken = require('../policies/validateToken')
const { User, Role, Permission } = require('../models')

module.exports = async ({ req }) => {
  const tokenValidation = validateToken(req)

  if (tokenValidation.valid) {
    const user = await User.findByPk(tokenValidation.token.id, {
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
    return { tokenValidation, user, role: user.role }
  }
}
