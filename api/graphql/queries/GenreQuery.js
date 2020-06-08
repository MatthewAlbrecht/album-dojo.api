const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql')
const { Op } = require('sequelize')
const buildPaginatedQuery = require('../../../utils/queryBuilder')

const { SortOrderEnumType, NameSortEnumType } = require('../enums')
const { GenreConnection } = require('../connections')
const { Genre } = require('../../models')

const genreQuery = {
  type: GenreConnection,
  args: {
    pageSize: {
      type: GraphQLInt,
    },
    after: {
      type: GraphQLString,
    },
    searchTerm: {
      type: GraphQLString,
    },
    sort: {
      type: NameSortEnumType,
    },
    sortOrder: {
      type: SortOrderEnumType,
    },
    id: {
      type: GraphQLID,
      name: 'id',
    },
    parentGenreId: {
      type: GraphQLID,
      name: 'parentGenreId',
    },
    name: {
      type: GraphQLString,
      name: 'name',
    },
    createdAt: {
      type: GraphQLString,
      name: 'createdAt',
    },
    updatedAt: {
      type: GraphQLString,
      name: 'updatedAt',
    },
  },
  resolve: async (genre, args) => {
    const query = buildPaginatedQuery(args, {
      integerSorts: [],
      dateSorts: ['createdAt', 'updatedAt'],
      searchTermStatement: [
        {
          name: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
      ],
    })

    const genres = await Genre.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying genres')
    })

    const totalCount = await Genre.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting genres')
    })

    if (genres && typeof totalCount !== undefined) {
      const cursor = genres.length && genres.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        genres,
      }
    }
  },
}

module.exports = { genreQuery }
