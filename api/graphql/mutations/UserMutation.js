const merge = require('lodash.merge');

const { UserType } = require('../types');
const { User } = require('../../models');
const { UserInputType } = require('../inputTypes');

const createUser = {
  type: UserType,
  description: 'The mutation that allows you to create a existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('create'),
    },
  },
  resolve: async (_, { user }) => {
    if (user.password !== user.password2) {
      throw new Error('Bad Request: Passwords don\'t match');
    }

    const createdUser = await User.create(user);

    if (!createdUser) {
      throw new Error('User could not be created!');
    }

    return createdUser;
  },
};

const updateUser = {
  type: UserType,
  description: 'The mutation that allows you to update an existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('update'),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    const updatedUser = merge(foundUser, {
      username: user.username,
      email: user.email,
      spotifyId: user.spotifyId,
      isFeatured: user.isFeatured,
      role: user.role,
    });

    return foundUser.update(updatedUser);
  },
};

const deleteUser = {
  type: UserType,
  description: 'The mutation that allows you to delete a existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('delete'),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id);

    if (!foundUser) {
      throw new Error(`User with id: ${user.id} not found!`);
    }

    await User.destroy({
      where: {
        id: user.id,
      },
    });

    return foundUser;
  },
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};
