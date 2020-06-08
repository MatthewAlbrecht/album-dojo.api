const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql')

const ActionInputType = type => {
  let allGraphFields = {}

  switch (type) {
    case 'delete':
      allGraphFields = {
        code: {
          type: new GraphQLNonNull(GraphQLString),
        },
      }
      break
    case 'update':
      allGraphFields = {
        code: {
          type: new GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        points: {
          type: GraphQLInt,
        },
        achievementCode: {
          type: GraphQLString,
        },
      }
      break
    case 'create':
      allGraphFields = {
        code: {
          type: GraphQLString,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        imageUrl: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        points: {
          type: GraphQLInt,
        },
        achievementCode: {
          type: GraphQLString,
        },
      }
      break
    default:
      allGraphFields = {
        code: {
          type: new GraphQLNonNull(GraphQLString),
        },
      }
  }

  const actionInputType = new GraphQLInputObjectType({
    name: `ActionInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a ActionInputType',
    fields: allGraphFields,
  })

  return actionInputType
}

module.exports = { ActionInputType }
