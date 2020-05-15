const { commonFields } = require('../utils/seeds');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('roles', [
      {
        ...commonFields(),
        name: 'USER',
      },
      {
        ...commonFields(),
        name: 'ADMIN',
      },
      {
        ...commonFields(),
        name: 'SUPER_ADMIN',
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
