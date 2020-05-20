const { uuid } = require('uuidv4')
const { IDS } = require('../utils/seeds')
const userActionData = require('../utils/seeds/userActionData')

module.exports = {
  up: async queryInterface => {
    const userActions = userActionData.map(userAction => ({
      id: uuid(),
      userId: IDS.USER,
      updatedAt: new Date(),
      createdAt: new Date(),
      ...userAction,
    }))

    await queryInterface.bulkInsert('userActions', userActions, {})
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('userActions', null, {})
  },
}
