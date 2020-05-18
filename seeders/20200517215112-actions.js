const actionData = require('../utils/seeds/actionData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('actions', actionData.map((action) => ({
      ...action,
      updatedAt: new Date(),
      createdAt: new Date(),
    })), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('actions', null, {});
  },
};
