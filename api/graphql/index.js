const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const {
  achievementQuery,
  albumQuery,
  actionQuery,
  listQuery,
  userAlbumQuery,
  userQuery,
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
  createAchievement,
  updateAchievement,
  deleteAchievement,
  createAction,
  updateAction,
  deleteAction,
  createList,
  updateList,
  deleteList,

} = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    achievement: achievementQuery,
    album: albumQuery,
    action: actionQuery,
    list: listQuery,
    userAlbum: userAlbumQuery,
    user: userQuery,
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
    createAchievement,
    updateAchievement,
    deleteAchievement,
    createAction,
    updateAction,
    deleteAction,
    createList,
    updateList,
    deleteList,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = { schema };
