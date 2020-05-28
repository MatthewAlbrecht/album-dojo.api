const { IDS } = require('../utils/seeds')
const rolePermissionData = require('../utils/seeds/rolePermissionData.json')

module.exports = {
  up: async queryInterface => {
    const rolePermissionObjects = []
    rolePermissionData.forEach(role => {
      role.permissions.forEach(permission => {
        rolePermissionObjects.push({
          id: IDS.RANDOM(),
          permissionName: permission,
          roleName: role.roleName,
          updatedAt: new Date(),
          createdAt: new Date(),
        })
      })
    })

    await queryInterface.bulkInsert(
      'rolePermissions',
      rolePermissionObjects,
      {}
    )
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('rolePermissions', null, {})
  },
}
