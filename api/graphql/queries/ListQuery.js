const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { ListType } = require('../types')
const { List } = require('../../models')

const listQuery = {
  type: new GraphQLList(ListType),
  args: {
    id: {
      type: GraphQLID,
      name: 'id',
    },
    userId: {
      type: GraphQLID,
      name: 'userId',
    },
    name: {
      type: GraphQLString,
      name: 'name',
    },
    description: {
      type: GraphQLString,
      name: 'description',
    },
    maxCount: {
      type: GraphQLInt,
      name: 'maxCount',
    },
    createdFromTemplate: {
      type: GraphQLBoolean,
      name: 'createdFromTemplate',
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
  resolve: (list, args) => List.findAll({ where: args }),
}

module.exports = { listQuery }
