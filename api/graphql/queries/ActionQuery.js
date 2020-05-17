const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { ActionType } = require('../types');
const { Action } = require('../../models');

const actionQuery = {
  type: new GraphQLList(ActionType),
  args: {
    id: {
      type: GraphQLID,
      name: 'id',
    },
    name: {
      type: GraphQLString,
      name: 'name',
    },
    code: {
      type: GraphQLString,
      name: 'code',
    },
    description: {
      type: GraphQLString,
      name: 'description',
    },
    level: {
      type: GraphQLInt,
      name: 'level',
    },
    points: {
      type: GraphQLInt,
      name: 'points',
    },
    createdAt: {
      type: GraphQLString,
      name: 'createdAt',
    },
    updatedAt: {
      type: GraphQLString,
      name: 'updatedAt',
    },
  },
  resolve: (action, args) => Action.findAll({ where: args }),
};

module.exports = { actionQuery };
