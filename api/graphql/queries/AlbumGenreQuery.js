const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql')
const buildPaginatedQuery = require('../../../utils/queryBuilder')

const { AlbumGenreConnection } = require('../connections')
const { SortOrderEnumType, SortEnumType } = require('../enums')
const { AlbumGenre } = require('../../models')

const albumGenreQuery = {
  type: AlbumGenreConnection,
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
      type: SortEnumType,
    },
    sortOrder: {
      type: SortOrderEnumType,
    },
    id: {
      type: GraphQLID,
      name: 'id',
    },
    albumId: {
      type: GraphQLID,
      name: 'albumId',
    },
    genreId: {
      type: GraphQLID,
      name: 'genreId',
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
  resolve: async (albumGenre, args) => {
    const query = buildPaginatedQuery(args, {
      integerSorts: [],
      dateSorts: ['createdAt', 'updatedAt'],
    })

    const albumGenres = await AlbumGenre.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying albumGenres')
    })

    const totalCount = await AlbumGenre.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting albumGenres')
    })

    if (albumGenres && typeof totalCount !== undefined) {
      const cursor = albumGenres.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        albumGenres,
      }
    }
  },
}

module.exports = { albumGenreQuery }
