const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const { Genre, Album } = require('../../models')

const AlbumGenreType = new GraphQLObjectType({
  name: 'AlbumGenre',
  description: 'This represents an AlbumGenre',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: albumGenre => albumGenre.id,
    },
    genreId: {
      type: GraphQLID,
      resolve: albumGenre => albumGenre.genreId,
    },
    albumId: {
      type: GraphQLString,
      resolve: albumGenre => albumGenre.albumId,
    },
    genre: {
      type: require('./GenreType').GenreType,
      resolve: albumGenre => Genre.findByPk(albumGenre.genreId),
    },
    album: {
      type: require('./AlbumType').AlbumType,
      resolve: albumGenre => Album.findByPk(albumGenre.albumId),
    },
    createdAt: {
      type: GraphQLString,
      resolve: albumGenre => albumGenre.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: albumGenre => albumGenre.updatedAt,
    },
  }),
})

module.exports = { AlbumGenreType }
