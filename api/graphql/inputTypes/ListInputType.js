const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql')

const ListInputType = type => {
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
        userId: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        maxCount: {
          type: GraphQLInt,
        },
        createdFromTemplate: {
          type: GraphQLBoolean,
        },
      }
      break
    case 'create':
      allGraphFields = {
        userId: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        maxCount: {
          type: GraphQLInt,
        },
        createdFromTemplate: {
          type: GraphQLBoolean,
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

  const listInputType = new GraphQLInputObjectType({
    name: `ListInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a ListInputType',
    fields: allGraphFields,
  })

  return listInputType
}

module.exports = { ListInputType }
