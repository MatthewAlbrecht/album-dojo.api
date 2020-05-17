const merge = require('lodash.merge');

const { PermissionType } = require('../types');
const { Permission } = require('../../models');
const { PermissionInputType } = require('../inputTypes');

const createPermission = {
  type: PermissionType,
  description: 'The mutation that allows you to create a existing Permission by Id',
  args: {
    permission: {
      name: 'permission',
      type: PermissionInputType('create'),
    },
  },
  resolve: async (_, { permission }) => {
    const createdPermission = await Permission.create(permission);

    if (!createdPermission) {
      throw new Error('Permission could not be created!');
    }

    return createdPermission;
  },
};

const updatePermission = {
  type: PermissionType,
  description: 'The mutation that allows you to update an existing Permission by Id',
  args: {
    permission: {
      name: 'permission',
      type: PermissionInputType('update'),
    },
  },
  resolve: async (_, { permission }) => {
    const foundPermission = await Permission.findByPk(permission.id);

    if (!foundPermission) {
      throw new Error(`Permission with id: ${permission.id} not found!`);
    }

    const updatedPermission = merge(foundPermission, {
      name: permission.name,
      description: permission.description,
    });

    return foundPermission.update(updatedPermission);
  },
};

const deletePermission = {
  type: PermissionType,
  description: 'The mutation that allows you to delete a existing Permission by Id',
  args: {
    permission: {
      name: 'permission',
      type: PermissionInputType('delete'),
    },
  },
  resolve: async (_, { permission }) => {
    const foundPermission = await Permission.findByPk(permission.id);

    if (!foundPermission) {
      throw new Error(`Permission with id: ${permission.id} not found!`);
    }

    await Permission.destroy({
      where: {
        id: permission.id,
      },
    });

    return foundPermission;
  },
};

module.exports = {
  createPermission,
  updatePermission,
  deletePermission,
};
