const { Op } = require('sequelize')
const sequelize = require('sequelize')

module.exports = buildPaginatedQuery = (
  { pageSize = 20, after, sort, sortOrder, searchTerm, ...args },
  { integerSorts, dateSorts, searchTermStatement }
) => {
  let query = {
    limit: pageSize,
    order: [[sort || 'createdAt', sortOrder || 'DESC']],
    where: args,
  }

  const querySort = query.order[0][0]
  const isAscending = query.order[0][1] === 'ASC'

  if (after) {
    // TODO: Account for args
    let cursor = after
    if (integerSorts.includes(querySort)) {
      cursor = +cursor
    } else if (dateSorts.includes(querySort)) {
      console.log(
        'cursor, new Date(cursor) ==='.toUpperCase(),
        cursor,
        new Date(+cursor)
      )
      cursor = new Date(+cursor)
    }
    query.where[sort] = {
      [isAscending ? Op.gte : Op.lte]: cursor,
    }
  }
  if (searchTerm) {
    query.where[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
      {
        spotifyId: {
          [Op.iLike]: `%${searchTerm}%`,
        },
      },
      sequelize.where(sequelize.cast(sequelize.col('artists'), 'text'), {
        [Op.iLike]: `%${searchTerm}%`,
      }),
    ]
  }
  return query
}
