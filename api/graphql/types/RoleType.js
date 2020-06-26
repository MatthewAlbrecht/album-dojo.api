/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql')

const RoleType = new GraphQLObjectType({
  name: 'Role',
  description: 'This represents an Role',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: role => role.id,
    },
    name: {
      type: GraphQLString,
      resolve: role => role.name,
    },
    description: {
      type: GraphQLString,
      resolve: role => role.description,
    },
    permissions: {
      type: new GraphQLList(require('./PermissionType').PermissionType),
      resolve: role => role.getPermissions(),
    },
    createdAt: {
      type: GraphQLString,
      resolve: role => role.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: role => role.updatedAt,
    },
  }),
})

module.exports = { RoleType }
