const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = require('graphql')

const UserAlbumInputType = type => {
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
        rating: {
          type: GraphQLID,
        },
        listenDate: {
          type: GraphQLString,
        },
        tags: {
          type: GraphQLList(GraphQLString),
        },
      }
      break
    case 'create':
      allGraphFields = {
        userId: {
          type: GraphQLID,
        },
        albumId: {
          type: GraphQLID,
        },
        rating: {
          type: GraphQLFloat,
        },
        listenDate: {
          type: GraphQLString,
        },
        tags: {
          type: GraphQLList(GraphQLString),
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

  const userAlbumInputType = new GraphQLInputObjectType({
    name: `UserAlbumInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a UserAlbumInputType',
    fields: allGraphFields,
  })

  return userAlbumInputType
}

module.exports = { UserAlbumInputType }
