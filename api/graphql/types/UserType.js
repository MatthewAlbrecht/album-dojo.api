const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { UserAlbumType } = require('./UserAlbumType');
const { UserAlbum } = require('../../models');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (user) => user.id,
    },
    username: {
      type: GraphQLString,
      resolve: (user) => user.username,
    },
    email: {
      type: GraphQLString,
      resolve: (user) => user.email,
    },
    firstName: {
      type: GraphQLString,
      resolve: (user) => user.firstName,
    },
    lastName: {
      type: GraphQLString,
      resolve: (user) => user.lastName,
    },
    albums: {
      type: new GraphQLList(UserAlbumType),
      resolve: async (user) => UserAlbum.findAll({ where: { userId: user.id } }),
    },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (user) => user.updatedAt,
    },
  }),
});

module.exports = { UserType };
