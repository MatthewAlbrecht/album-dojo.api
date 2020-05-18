const achievementData = require('../utils/seeds/achievementData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('achievements', achievementData.map((achievement) => ({
      ...achievement,
      updatedAt: new Date(),
      createdAt: new Date(),
    })), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('achievements', null, {});
  },
};
