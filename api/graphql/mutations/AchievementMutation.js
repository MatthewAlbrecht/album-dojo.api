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
    const foundAchievement = await Achievement.findByPk(achievement.id);

    if (!foundAchievement) {
      throw new Error(`Achievement with id: ${achievement.id} not found!`);
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
  resolve: async (value, { id }) => {
    const foundAchievement = await Achievement.findByPk(id);

    if (!foundAchievement) {
      throw new Error(`Achievement with id: ${id} not found!`);
    }

    await Achievement.destroy({
      where: {
        id,
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
