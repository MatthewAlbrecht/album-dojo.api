module.exports = {
  up: async (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    // await queryInterface.addIndex('albums', {
    //   fields: ['spotifyId'],
    //   unique: true,
    // })
    await queryInterface.addColumn('albums', 'duplicateOfId', {
      type: Sequelize.STRING,
      references: {
        model: 'albums', // name of Target model
        key: 'spotifyId', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    await queryInterface.removeColumn('albums', 'duplicateOfId')
    // await queryInterface.removeIndex('albums', ['spotifyId'])
  },
}
