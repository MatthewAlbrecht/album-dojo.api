const { IDS } = require('../utils/seeds');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        id: IDS.USER,
        role: 'USER',
        username: 'matt1',
        password: '12345',
        email: 'matt@matt.com',
        firstName: 'matt',
        lastName: 'albrecht',
        spotifyId: '123lksadf2l',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
