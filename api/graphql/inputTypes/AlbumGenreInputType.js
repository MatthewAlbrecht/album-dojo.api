const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const AlbumGenreInputType = type => {
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
      }
      break
    case 'create':
      allGraphFields = {
        albumId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        genreId: {
          type: new GraphQLNonNull(GraphQLID),
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
    name: `AlbumGenreInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a AlbumGenreInputType',
    fields: allGraphFields,
  })

  return albumInputType
}

module.exports = { AlbumGenreInputType }
