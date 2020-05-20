const merge = require('lodash.merge')

const { RoleType } = require('../types')
const { Role } = require('../../models')
const { RoleInputType } = require('../inputTypes')

const createRole = {
  type: RoleType,
  description: 'The mutation that allows you to create a existing Role by Id',
  args: {
    role: {
      name: 'role',
      type: RoleInputType('create'),
    },
  },
  resolve: async (_, { role }) => {
    const createdRole = await Role.create(role)

    if (!createdRole) {
      throw new Error('Role could not be created!')
    }

    return createdRole
  },
}

const updateRole = {
  type: RoleType,
  description: 'The mutation that allows you to update an existing Role by Id',
  args: {
    role: {
      name: 'role',
      type: RoleInputType('update'),
    },
  },
  resolve: async (_, { role }) => {
    const foundRole = await Role.findByPk(role.id)

    if (!foundRole) {
      throw new Error(`Role with id: ${role.id} not found!`)
    }

    const updatedRole = merge(foundRole, {
      name: role.name,
      description: role.description,
    })

    return foundRole.update(updatedRole)
  },
}

const deleteRole = {
  type: RoleType,
  description: 'The mutation that allows you to delete a existing Role by Id',
  args: {
    role: {
      name: 'role',
      type: RoleInputType('delete'),
    },
  },
  resolve: async (_, { role }) => {
    const foundRole = await Role.findByPk(role.id)

    if (!foundRole) {
      throw new Error(`Role with id: ${role.id} not found!`)
    }

    await Role.destroy({
      where: {
        id: role.id,
      },
    })

    return foundRole
  },
}

module.exports = {
  createRole,
  updateRole,
  deleteRole,
}
