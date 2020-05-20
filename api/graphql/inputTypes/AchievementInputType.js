const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql')

const AchievementInputType = type => {
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
        imageUrl: {
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
        level: {
          type: GraphQLInt,
        },
        imageUrl: {
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

  const achievementInputType = new GraphQLInputObjectType({
    name: `AchievementInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a AchievementInputType',
    fields: allGraphFields,
  })

  return achievementInputType
}

module.exports = { AchievementInputType }
