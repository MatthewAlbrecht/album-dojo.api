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
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: IDS.ADMIN,
          role: 'ADMIN',
          username: 'admin',
          password:
            '$2a$10$bbtJ9vLYSRNFAaVIHEMsC.dgukHcXFBVlLO6alCxPoOMmuBKNZ1EK', // matt
          email: 'admin@matt.com',
          firstName: 'matt',
          lastName: 'albrecht',
          spotifyId: 'fakespotifyid10',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: IDS.SUPER_ADMIN,
          role: 'SUPER_ADMIN',
          username: 'superadmin',
          password:
            '$2a$10$bbtJ9vLYSRNFAaVIHEMsC.dgukHcXFBVlLO6alCxPoOMmuBKNZ1EK', // matt
          email: 'superadmin@matt.com',
          firstName: 'matt',
          lastName: 'albrecht',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: IDS.JESUS,
          role: 'SUPER_ADMIN',
          username: 'jesus',
          password:
            '$2a$10$bbtJ9vLYSRNFAaVIHEMsC.dgukHcXFBVlLO6alCxPoOMmuBKNZ1EK', // matt
          email: 'jesus@matt.com',
          firstName: 'jesus',
          lastName: 'albrecht',
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
