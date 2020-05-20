const merge = require('lodash.merge')

const { AlbumType } = require('../types')
const { Album } = require('../../models')
const { AlbumInputType } = require('../inputTypes')

const createAlbum = {
  type: AlbumType,
  description: 'The mutation that allows you to create a new Album',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('create'),
    },
  },
  resolve: async (_, { album }) => {
    const createdAlbum = await Album.create(album)

    if (!createdAlbum) {
      throw new Error('Album could not be created!')
    }

    return createdAlbum
  },
}

const updateAlbum = {
  type: AlbumType,
  description: 'The mutation that allows you to update an existing Album by Id',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('update'),
    },
  },
  resolve: async (_, { id, spotifyId, isFeatured }) => {
    const foundAlbum = await Album.findByPk(id)

    if (!foundAlbum) {
      throw new Error(`Album with id: ${id} not found!`)
    }

    const updatedAlbum = merge(foundAlbum, {
      spotifyId,
      isFeatured,
    })

    return foundAlbum.update(updatedAlbum)
  },
}

const deleteAlbum = {
  type: AlbumType,
  description: 'The mutation that allows you to delete a existing Album by Id',
  args: {
    album: {
      name: 'album',
      type: AlbumInputType('delete'),
    },
  },
  resolve: async (value, { id }) => {
    const foundAlbum = await Album.findByPk(id)

    if (!foundAlbum) {
      throw new Error(`Album with id: ${id} not found!`)
    }

    await Album.destroy({
      where: {
        id,
      },
    })

    return foundAlbum
  },
}

module.exports = {
  createAlbum,
  updateAlbum,
  deleteAlbum,
}
