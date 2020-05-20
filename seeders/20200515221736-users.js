const { IDS } = require('../utils/seeds')

module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: IDS.USER,
          role: 'USER',
          username: 'matt',
          password:
            '$2a$10$bbtJ9vLYSRNFAaVIHEMsC.dgukHcXFBVlLO6alCxPoOMmuBKNZ1EK', // matt
          email: 'matt@matt.com',
          firstName: 'matt',
          lastName: 'albrecht',
          spotifyId: 'fakespotifyid10',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },
  down: async queryInterface => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
