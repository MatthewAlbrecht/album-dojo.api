const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql')

const UserInputType = type => {
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
        username: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        spotifyId: {
          type: GraphQLString,
        },
        role: {
          type: GraphQLString,
        },
      }
      break
    case 'create':
      allGraphFields = {
        username: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
        role: {
          type: GraphQLString,
        },
        spotifyId: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
        },
        password2: {
          type: GraphQLString,
        },
      }
      break
    case 'login':
      allGraphFields = {
        email: {
          type: GraphQLString,
        },
        password: {
          type: GraphQLString,
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

  const userInputType = new GraphQLInputObjectType({
    name: `UserInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a UserInputType',
    fields: allGraphFields,
  })

  return userInputType
}

module.exports = { UserInputType }
