const { IDS } = require('../utils/seeds')

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'lists',
      [
        {
          id: IDS.LIST,
          userId: IDS.USER,
          name: 'Top 10 Albums of All Time',
          description: 'This is my list of the top 10 albums of all time.',
          maxCount: 10,
          createdFromTemplate: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('lists', null, {})
  },
}
