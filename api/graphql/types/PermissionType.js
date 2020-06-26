/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require('graphql')

const PermissionType = new GraphQLObjectType({
  name: 'Permission',
  description: 'This represents an Permission',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: permission => permission.id,
    },
    name: {
      type: GraphQLString,
      resolve: permission => permission.name,
    },
    description: {
      type: GraphQLString,
      resolve: permission => permission.description,
    },
    roles: {
      type: new GraphQLList(require('./RoleType').RoleType),
      resolve: permission => permission.getRoles(),
    },
    createdAt: {
      type: GraphQLString,
      resolve: permission => permission.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: permission => permission.updatedAt,
    },
  }),
})

module.exports = { PermissionType }
