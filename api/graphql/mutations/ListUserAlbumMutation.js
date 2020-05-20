const merge = require('lodash.merge')

const { ListUserAlbumType } = require('../types')
const { ListUserAlbum } = require('../../models')
const { ListUserAlbumInputType } = require('../inputTypes')

const createListUserAlbum = {
  type: ListUserAlbumType,
  description:
    'The mutation that allows you to create a existing ListUserAlbum by Id',
  args: {
    listUserAlbum: {
      name: 'listUserAlbum',
      type: ListUserAlbumInputType('create'),
    },
  },
  resolve: async (_, { listUserAlbum }) => {
    const createdListUserAlbum = await ListUserAlbum.create(listUserAlbum)

    if (!createdListUserAlbum) {
      throw new Error('ListUserAlbum could not be created!')
    }

    return createdListUserAlbum
  },
}

const updateListUserAlbum = {
  type: ListUserAlbumType,
  description:
    'The mutation that allows you to update an existing ListUserAlbum by Id',
  args: {
    listUserAlbum: {
      name: 'listUserAlbum',
      type: ListUserAlbumInputType('update'),
    },
  },
  resolve: async (_, { listUserAlbum }) => {
    const foundListUserAlbum = await ListUserAlbum.findByPk(listUserAlbum.id)

    if (!foundListUserAlbum) {
      throw new Error(`ListUserAlbum with id: ${listUserAlbum.id} not found!`)
    }

    const updatedListUserAlbum = merge(foundListUserAlbum, {
      rank: listUserAlbum.rank,
    })

    return foundListUserAlbum.update(updatedListUserAlbum)
  },
}

const deleteListUserAlbum = {
  type: ListUserAlbumType,
  description:
    'The mutation that allows you to delete a existing ListUserAlbum by Id',
  args: {
    listUserAlbum: {
      name: 'listUserAlbum',
      type: ListUserAlbumInputType('delete'),
    },
  },
  resolve: async (_, { listUserAlbum }) => {
    const foundListUserAlbum = await ListUserAlbum.findByPk(listUserAlbum.id)

    if (!foundListUserAlbum) {
      throw new Error(`ListUserAlbum with id: ${listUserAlbum.id} not found!`)
    }

    await ListUserAlbum.destroy({
      where: {
        id: listUserAlbum.id,
      },
    })

    return foundListUserAlbum
  },
}

module.exports = {
  createListUserAlbum,
  updateListUserAlbum,
  deleteListUserAlbum,
}
