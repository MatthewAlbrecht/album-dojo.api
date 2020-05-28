module.exports = (permissionNeeded, userPermissions) => {
  return userPermissions.includes(permissionNeeded)
}
