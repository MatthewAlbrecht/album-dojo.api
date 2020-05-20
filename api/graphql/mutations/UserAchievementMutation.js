const { UserAchievementType } = require('../types')
const { UserAchievement } = require('../../models')
const { UserAchievementInputType } = require('../inputTypes')

const createUserAchievement = {
  type: UserAchievementType,
  description:
    'The mutation that allows you to create a existing UserAchievement by Id',
  args: {
    userAchievement: {
      name: 'userAchievement',
      type: UserAchievementInputType('create'),
    },
  },
  resolve: async (_, { userAchievement }) => {
    const createdUserAchievement = await UserAchievement.create(userAchievement)

    if (!createdUserAchievement) {
      throw new Error('UserAchievement could not be created!')
    }

    return createdUserAchievement
  },
}

const deleteUserAchievement = {
  type: UserAchievementType,
  description:
    'The mutation that allows you to delete a existing UserAchievement by Id',
  args: {
    userAchievement: {
      name: 'userAchievement',
      type: UserAchievementInputType('delete'),
    },
  },
  resolve: async (_, { userAchievement }) => {
    const foundUserAchievement = await UserAchievement.findByPk(
      userAchievement.id
    )

    if (!foundUserAchievement) {
      throw new Error(
        `UserAchievement with id: ${userAchievement.id} not found!`
      )
    }

    await UserAchievement.destroy({
      where: {
        id: userAchievement.id,
      },
    })

    return foundUserAchievement
  },
}

module.exports = {
  createUserAchievement,
  deleteUserAchievement,
}
