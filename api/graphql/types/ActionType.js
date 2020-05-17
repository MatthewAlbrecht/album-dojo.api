const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

const ActionType = new GraphQLObjectType({
  name: 'Action',
  description: 'This represents an Action',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (action) => action.id,
    },
    name: {
      type: GraphQLString,
      resolve: (action) => action.name,
    },
    code: {
      type: GraphQLString,
      resolve: (action) => action.code,
    },
    description: {
      type: GraphQLString,
      resolve: (action) => action.description,
    },
    level: {
      type: GraphQLInt,
      resolve: (action) => action.level,
    },
    points: {
      type: GraphQLInt,
      resolve: (action) => action.points,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (action) => action.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (action) => action.updatedAt,
    },
  }),
});

module.exports = { ActionType };
