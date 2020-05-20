const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const UserActionInputType = type => {
  let allGraphFields = {}

  switch (type) {
    case 'delete':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      }
      break
    case 'create':
      allGraphFields = {
        userId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        actionCode: {
          type: new GraphQLNonNull(GraphQLString),
        },
        achievementCode: {
          type: GraphQLString,
        },
        listId: {
          type: GraphQLID,
        },
        userAlbumId: {
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

  const userActionInputType = new GraphQLInputObjectType({
    name: `UserActionInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a UserActionInputType',
    fields: allGraphFields,
  })

  return userActionInputType
}

module.exports = { UserActionInputType }
