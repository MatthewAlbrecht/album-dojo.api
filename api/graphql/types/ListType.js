/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLID,
} = require('graphql');
const { User } = require('../../models');

const ListType = new GraphQLObjectType({
  name: 'List',
  description: 'This represents an List',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (list) => list.id,
    },
    userId: {
      type: GraphQLID,
      resolve: (list) => list.userId,
    },
    user: {
      type: require('./UserType').UserType,
      resolve: (list) => User.findByPk(list.userId),
    },
    name: {
      type: GraphQLString,
      resolve: (list) => list.name,
    },
    description: {
      type: GraphQLString,
      resolve: (list) => list.description,
    },
    maxCount: {
      type: GraphQLInt,
      resolve: (list) => list.maxCount,
    },
    createdFromTemplate: {
      type: GraphQLBoolean,
      resolve: (list) => list.createdFromTemplate,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (list) => list.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (list) => list.createdAt,
    },
  }),
});

module.exports = { ListType };
