const { uuid } = require('uuidv4');

module.exports.commonFields = () => ({
  id: uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
});
