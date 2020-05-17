/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const { RolePermission } = require('../../models');

const RoleType = new GraphQLObjectType({
  name: 'Role',
  description: 'This represents an Role',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (role) => role.id,
    },
    name: {
      type: GraphQLString,
      resolve: (role) => role.name,
    },
    description: {
      type: GraphQLString,
      resolve: (role) => role.description,
    },
    permissions: {
      type: require('./RolePermissionType').RolePermissionType,
      resolve: (role) => RolePermission.findAll({ where: { roleName: role.name } }),
    },
    createdAt: {
      type: GraphQLString,
      resolve: (role) => role.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (role) => role.updatedAt,
    },
  }),
});

module.exports = { RoleType };
