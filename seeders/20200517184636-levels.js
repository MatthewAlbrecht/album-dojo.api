const levelData = require('../utils/seeds/levelData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('levels', levelData.map((level) => ({
      ...level,
      updatedAt: new Date(),
      createdAt: new Date(),
    })), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('levels', null, {});
  },
};
