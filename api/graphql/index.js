const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const {
  achievementQuery,
  actionQuery,
  albumQuery,
  listQuery,
  listUserAlbumQuery,
  permissionQuery,
  rolePermissionQuery,
  roleQuery,
  userAchievementQuery,
  userActionQuery,
  userAlbumQuery,
  userQuery,
} = require('./queries')

const {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  createAlbum,
  createAlbumById,
  createAlbumsByPlaylist,
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
  createListUserAlbum,
  updateListUserAlbum,
  deleteListUserAlbum,
  createPermission,
  updatePermission,
  deletePermission,
  createRolePermission,
  deleteRolePermission,
  createRole,
  updateRole,
  deleteRole,
  createUserAchievement,
  deleteUserAchievement,
  createUserAction,
  deleteUserAction,
} = require('./mutations')

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description:
    'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    achievement: achievementQuery,
    action: actionQuery,
    album: albumQuery,
    list: listQuery,
    listUserAlbum: listUserAlbumQuery,
    permission: permissionQuery,
    rolePermission: rolePermissionQuery,
    role: roleQuery,
    userAchievement: userAchievementQuery,
    userAction: userActionQuery,
    userAlbum: userAlbumQuery,
    user: userQuery,
  }),
})

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description:
    'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    createAlbum,
    createAlbumById,
    createAlbumsByPlaylist,
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
    createListUserAlbum,
    updateListUserAlbum,
    deleteListUserAlbum,
    createPermission,
    updatePermission,
    deletePermission,
    createRolePermission,
    deleteRolePermission,
    createRole,
    updateRole,
    deleteRole,
    createUserAchievement,
    deleteUserAchievement,
    createUserAction,
    deleteUserAction,
  }),
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})

module.exports = { schema }
