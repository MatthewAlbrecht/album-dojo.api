const merge = require('lodash.merge')
const { GenreType } = require('../types')
const { Genre } = require('../../models')
const { GenreInputType } = require('../inputTypes')

const createGenre = {
  type: GenreType,
  description: 'The mutation that allows you to create a new Genre',
  args: {
    genre: {
      name: 'genre',
      type: GenreInputType('create'),
    },
  },
  resolve: async (_, { genre }) => {
    const createdGenre = await Genre.create(genre)

    if (!createdGenre) {
      throw new Error('Genre could not be created!')
    }

    return createdGenre
  },
}

const updateGenre = {
  type: GenreType,
  description: 'The mutation that allows you to update an existing Genre by Id',
  args: {
    genre: {
      name: 'genre',
      type: GenreInputType('update'),
    },
  },
  resolve: async (_, { id, name, parentGenreId }) => {
    const foundGenre = await Genre.findByPk(id)

    if (!foundGenre) {
      throw new Error(`Genre with id: ${id} not found!`)
    }

    const updatedGenre = merge(foundGenre, {
      name,
      parentGenreId,
    })

    return foundGenre.update(updatedGenre)
  },
}

const deleteGenre = {
  type: GenreType,
  description: 'The mutation that allows you to delete a existing Genre by Id',
  args: {
    genre: {
      name: 'genre',
      type: GenreInputType('delete'),
    },
  },
  resolve: async (value, { id }) => {
    const foundGenre = await Genre.findByPk(id)

    if (!foundGenre) {
      throw new Error(`Genre with id: ${id} not found!`)
    }

    await Genre.destroy({
      where: {
        id,
      },
    })

    return foundGenre
  },
}

module.exports = {
  createGenre,
  updateGenre,
  deleteGenre,
}
