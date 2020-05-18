const { commonFields } = require('../utils/seeds');
const roleData = require('../utils/seeds/roleData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', roleData.map((roles) => ({
      ...commonFields(),
      ...roles,
    })), {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
