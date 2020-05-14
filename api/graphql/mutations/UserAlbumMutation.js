const merge = require('lodash.merge');

const { UserAlbumType } = require('../types');
const { UserAlbum } = require('../../models');
const { UserAlbumInputType } = require('../inputTypes');

const createUserAlbum = {
  type: UserAlbumType,
  description: 'The mutation that allows you to create a existing UserAlbum by Id',
  args: {
    userAlbum: {
      name: 'userAlbum',
      type: UserAlbumInputType('create'),
    },
  },
  resolve: async (_, { userAlbum }) => {
    const createdUserAlbum = await UserAlbum.create(userAlbum);

    if (!createdUserAlbum) {
      throw new Error('UserAlbum could not be created!');
    }

    return createdUserAlbum;
  },
};

const updateUserAlbum = {
  type: UserAlbumType,
  description: 'The mutation that allows you to update an existing UserAlbum by Id',
  args: {
    userAlbum: {
      name: 'userAlbum',
      type: UserAlbumInputType('update'),
    },
  },
  resolve: async (_, { userAlbum }) => {
    const foundUserAlbum = await UserAlbum.findByPk(userAlbum.id);

    if (!foundUserAlbum) {
      throw new Error(`UserAlbum with id: ${userAlbum.id} not found!`);
    }

    const updatedUserAlbum = merge(foundUserAlbum, {
      rating: userAlbum.rating,
      listenDate: userAlbum.listenDate,
      tags: userAlbum.tags,
    });

    return foundUserAlbum.update(updatedUserAlbum);
  },
};

const deleteUserAlbum = {
  type: UserAlbumType,
  description: 'The mutation that allows you to delete a existing UserAlbum by Id',
  args: {
    userAlbum: {
      name: 'userAlbum',
      type: UserAlbumInputType('delete'),
    },
  },
  resolve: async (_, { userAlbum }) => {
    const foundUserAlbum = await UserAlbum.findByPk(userAlbum.id);

    if (!foundUserAlbum) {
      throw new Error(`UserAlbum with id: ${userAlbum.id} not found!`);
    }

    await UserAlbum.destroy({
      where: {
        id: userAlbum.id,
      },
    });

    return foundUserAlbum;
  },
};

module.exports = {
  createUserAlbum,
  updateUserAlbum,
  deleteUserAlbum,
};
