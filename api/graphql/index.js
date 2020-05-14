const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const {
  userQuery,
  albumQuery,
  userAlbumQuery,
} = require('./queries');

const {
  createUser,
  updateUser,
  deleteUser,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  createUserAlbum,
  updateUserAlbum,
  deleteUserAlbum,
} = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    user: userQuery,
    album: albumQuery,
    userAlbum: userAlbumQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    createUser,
    updateUser,
    deleteUser,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    createUserAlbum,
    updateUserAlbum,
    deleteUserAlbum,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = { schema };
