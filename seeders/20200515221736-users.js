const { commonFields } = require('../utils/seeds');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        ...commonFields(),
        role: 'USER',
        username: 'matt1',
        password: '12345',
        email: 'matt@matt.com',
        firstName: 'matt',
        lastName: 'albrecht',
        spotifyId: '123lksadf2l',
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
