const { IDS } = require('../utils/seeds')
const permissionData = require('../utils/seeds/permissionData.json')
const roleData = require('../utils/seeds/roleData.json')

module.exports = {
  up: async queryInterface => {
    const rolePermissionObjects = []
    permissionData.forEach(permission => {
      roleData.forEach(role => {
        rolePermissionObjects.push({
          id: IDS.RANDOM(),
          permissionName: permission.name,
          roleName: role.name,
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
