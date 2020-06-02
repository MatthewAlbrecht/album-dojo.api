const merge = require('lodash.merge')
const { AlbumGenreType } = require('../types')
const { AlbumGenre } = require('../../models')
const { AlbumGenreInputType } = require('../inputTypes')

const createAlbumGenre = {
  type: AlbumGenreType,
  description: 'The mutation that allows you to create a new AlbumGenre',
  args: {
    albumGenre: {
      name: 'albumGenre',
      type: AlbumGenreInputType('create'),
    },
  },
  resolve: async (_, { albumGenre }) => {
    const createdAlbumGenre = await AlbumGenre.create(albumGenre)

    if (!createdAlbumGenre) {
      throw new Error('AlbumGenre could not be created!')
    }

    return createdAlbumGenre
  },
}

const updateAlbumGenre = {
  type: AlbumGenreType,
  description:
    'The mutation that allows you to update an existing AlbumGenre by Id',
  args: {
    albumGenre: {
      name: 'albumGenre',
      type: AlbumGenreInputType('update'),
    },
  },
  resolve: async (_, { id }) => {
    const foundAlbumGenre = await AlbumGenre.findByPk(id)

    if (!foundAlbumGenre) {
      throw new Error(`AlbumGenre with id: ${id} not found!`)
    }

    const updatedAlbumGenre = merge(foundAlbumGenre, {})

    return foundAlbumGenre.update(updatedAlbumGenre)
  },
}

const deleteAlbumGenre = {
  type: AlbumGenreType,
  description:
    'The mutation that allows you to delete a existing AlbumGenre by Id',
  args: {
    albumGenre: {
      name: 'albumGenre',
      type: AlbumGenreInputType('delete'),
    },
  },
  resolve: async (value, { id }) => {
    const foundAlbumGenre = await AlbumGenre.findByPk(id)

    if (!foundAlbumGenre) {
      throw new Error(`AlbumGenre with id: ${id} not found!`)
    }

    await AlbumGenre.destroy({
      where: {
        id,
      },
    })

    return foundAlbumGenre
  },
}

module.exports = {
  createAlbumGenre,
  updateAlbumGenre,
  deleteAlbumGenre,
}
