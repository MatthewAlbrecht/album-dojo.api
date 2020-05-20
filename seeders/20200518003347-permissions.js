const { commonFields } = require('../utils/seeds')
const permissionData = require('../utils/seeds/permissionData.json')

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'permissions',
      permissionData.map(permissions => ({
        ...commonFields(),
        ...permissions,
      })),
      {}
    )
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('permissions', null, {})
  },
}
