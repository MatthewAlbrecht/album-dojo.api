module.exports = {
  up: async (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    await queryInterface.addColumn(
      'albums',
      'duplicateSpotifyIds',
      Sequelize.ARRAY(Sequelize.STRING)
    )
    await queryInterface.addColumn('albums', 'newReleaseDate', {
      type: Sequelize.DATEONLY,
    })
  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    await queryInterface.removeColumn('albums', 'duplicateSpotifyIds')
    await queryInterface.removeColumn('albums', 'newReleaseDate')
  },
}
