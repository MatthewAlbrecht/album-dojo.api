const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const GenreInputType = type => {
  let allGraphFields = {}

  switch (type) {
    case 'delete':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      }
      break
    case 'update':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        parentGenreId: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
      }
      break
    case 'create':
      allGraphFields = {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        parentGenreId: {
          type: GraphQLID,
        },
      }
      break
    default:
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      }
  }

  const albumInputType = new GraphQLInputObjectType({
    name: `GenreInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a GenreInputType',
    fields: allGraphFields,
  })

  return albumInputType
}

module.exports = { GenreInputType }
