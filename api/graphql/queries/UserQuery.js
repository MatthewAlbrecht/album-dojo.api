const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { UserType } = require('../types');
const { User } = require('../../models');

const userQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    username: {
      name: 'username',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    firstName: {
      name: 'firstName',
      type: GraphQLString,
    },
    lastName: {
      name: 'lastName',
      type: GraphQLString,
    },
    spotifyId: {
      name: 'spotifyId',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (user, args) => User.findAll({ where: args }),
};

module.exports = { userQuery };
