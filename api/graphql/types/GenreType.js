const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  description: 'This represents an Genre',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: genre => genre.id,
    },
    parentGenreId: {
      type: GraphQLID,
      resolve: genre => genre.parentGenreId,
    },
    parentGenre: {
      type: GenreType,
      resolve: genre => genre.getParentGenre(),
    },
    name: {
      type: GraphQLString,
      resolve: genre => genre.name,
    },
    createdAt: {
      type: GraphQLString,
      resolve: genre => genre.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: genre => genre.updatedAt,
    },
  }),
})

module.exports = { GenreType }
