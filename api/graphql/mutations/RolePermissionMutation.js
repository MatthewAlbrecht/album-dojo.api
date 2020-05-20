const { RolePermissionType } = require('../types')
const { RolePermission } = require('../../models')
const { RolePermissionInputType } = require('../inputTypes')

const createRolePermission = {
  type: RolePermissionType,
  description:
    'The mutation that allows you to create a existing RolePermission by Id',
  args: {
    rolePermission: {
      name: 'rolePermission',
      type: RolePermissionInputType('create'),
    },
  },
  resolve: async (_, { rolePermission }) => {
    const createdRolePermission = await RolePermission.create(rolePermission)

    if (!createdRolePermission) {
      throw new Error('RolePermission could not be created!')
    }

    return createdRolePermission
  },
}

const deleteRolePermission = {
  type: RolePermissionType,
  description:
    'The mutation that allows you to delete a existing RolePermission by Id',
  args: {
    rolePermission: {
      name: 'rolePermission',
      type: RolePermissionInputType('delete'),
    },
  },
  resolve: async (_, { rolePermission }) => {
    const foundRolePermission = await RolePermission.findByPk(rolePermission.id)

    if (!foundRolePermission) {
      throw new Error(`RolePermission with id: ${rolePermission.id} not found!`)
    }

    await RolePermission.destroy({
      where: {
        id: rolePermission.id,
      },
    })

    return foundRolePermission
  },
}

module.exports = {
  createRolePermission,
  deleteRolePermission,
}
