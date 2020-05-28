const { uuid } = require('uuidv4')

module.exports.commonFields = () => ({
  id: uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
})

module.exports.IDS = {
  USER: uuid(),
  ADMIN: uuid(),
  SUPER_ADMIN: uuid(),
  JESUS: uuid(),
  ALBUMS: [uuid(), uuid(), uuid(), uuid()],
  USER_ALBUMS: [uuid(), uuid(), uuid(), uuid()],
  LIST_USER_ALBUMS: [uuid(), uuid(), uuid(), uuid()],
  ROLE: uuid(),
  PERMISSION: [uuid()],
  ACTION: uuid(),
  ACHIEVEMENT: uuid(),
  LIST: uuid(),
  RANDOM: () => uuid(),
}
