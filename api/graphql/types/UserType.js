const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');

const { UserAlbumType } = require('./UserAlbumType');
const { ListType } = require('./ListType');
const { UserAlbum, List } = require('../../models');

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
    role: {
      type: GraphQLString,
      resolve: (user) => user.role,
    },
    albums: {
      type: new GraphQLList(UserAlbumType),
      resolve: async (user) => UserAlbum.findAll({ where: { userId: user.id } }),
    },
    lists: {
      type: new GraphQLList(ListType),
      resolve: async (user) => List.findAll({ where: { userId: user.id } }),
    },
    points: {
      type: GraphQLJSONObject,
      resolve: async () => ({
        totalPoints: 550,
        currentLevel: 17,
        nextLevelPointsMin: 700,
      }),
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
