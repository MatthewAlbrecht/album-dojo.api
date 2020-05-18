const merge = require('lodash.merge');

const { AchievementType } = require('../types');
const { Achievement } = require('../../models');
const { AchievementInputType } = require('../inputTypes');

const createAchievement = {
  type: AchievementType,
  description: 'The mutation that allows you to create a new Achievement',
  args: {
    achievement: {
      name: 'achievement',
      type: AchievementInputType('create'),
    },
  },
  resolve: async (_, { achievement }) => {
    const createdAchievement = await Achievement.create(achievement);

    if (!createdAchievement) {
      throw new Error('Achievement could not be created!');
    }

    return createdAchievement;
  },
};

const updateAchievement = {
  type: AchievementType,
  description: 'The mutation that allows you to update an existing Achievement by Id',
  args: {
    achievement: {
      name: 'achievement',
      type: AchievementInputType('update'),
    },
  },
  resolve: async (_, achievement) => {
    const foundAchievement = await Achievement.findByPk(achievement.code);

    if (!foundAchievement) {
      throw new Error(`Achievement with code: ${achievement.code} not found!`);
    }

    const updatedAchievement = merge(foundAchievement, {
      name: achievement.name,
      code: achievement.code,
      description: achievement.description,
      basePoints: achievement.basePoints,
    });

    return foundAchievement.update(updatedAchievement);
  },
};

const deleteAchievement = {
  type: AchievementType,
  description: 'The mutation that allows you to delete a existing Achievement by Id',
  args: {
    achievement: {
      name: 'achievement',
      type: AchievementInputType('delete'),
    },
  },
  resolve: async (value, { code }) => {
    const foundAchievement = await Achievement.findByPk(code);

    if (!foundAchievement) {
      throw new Error(`Achievement with code: ${code} not found!`);
    }

    await Achievement.destroy({
      where: {
        code,
      },
    });

    return foundAchievement;
  },
};

module.exports = {
  createAchievement,
  updateAchievement,
  deleteAchievement,
};
