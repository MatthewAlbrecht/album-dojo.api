/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const PermissionType = new GraphQLObjectType({
  name: 'Permission',
  description: 'This represents an Permission',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (permission) => permission.id,
    },
    name: {
      type: GraphQLString,
      resolve: (permission) => permission.name,
    },
    description: {
      type: GraphQLString,
      resolve: (permission) => permission.description,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (permission) => permission.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (permission) => permission.updatedAt,
    },
  }),
});

module.exports = { PermissionType };
