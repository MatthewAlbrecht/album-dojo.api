const { uuid } = require('uuidv4');
const { IDS } = require('../utils/seeds');
const userAchievementData = require('../utils/seeds/userAchievementData.json');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('userAchievements', userAchievementData.map((userAchievement) => ({
      id: uuid(),
      userId: IDS.USER,
      updatedAt: new Date(),
      createdAt: new Date(),
      ...userAchievement,
    })), {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('userAchievements', null, {});
  },
};
