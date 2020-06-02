const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLObjectType,
} = require('graphql')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { GraphQLJSONObject } = require('graphql-type-json')

const { AlbumConnection } = require('../types')
const { Album } = require('../../models')

const albumQuery = {
  type: AlbumConnection,
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
      type: new GraphQLEnumType({
        name: 'sort',
        values: {
          name: { value: 'name' },
          releaseDate: { value: 'releaseDate' },
          totalTracks: { value: 'totalTracks' },
          durationInMs: { value: 'durationInMs' },
          updatedAt: { value: 'updatedAt' },
          createdAt: { value: 'createdAt' },
        },
      }),
    },
    sortOrder: {
      type: new GraphQLEnumType({
        name: 'sortOrder',
        values: {
          ASC: { value: 'ASC' },
          DESC: { value: 'DESC' },
        },
      }),
    },
    id: {
      type: GraphQLID,
      name: 'id',
    },
    spotifyId: {
      type: GraphQLString,
      name: 'spotifyId',
    },
    artists: {
      type: new GraphQLList(GraphQLJSONObject),
      name: 'artists',
    },
    images: {
      type: new GraphQLList(GraphQLJSONObject),
      name: 'images',
    },
    name: {
      type: GraphQLString,
      name: 'name',
    },
    releaseDate: {
      type: GraphQLString,
      name: 'releaseDate',
    },
    releaseDatePrecision: {
      type: GraphQLString,
      name: 'releaseDatePrecision',
    },
    totalTracks: {
      type: GraphQLInt,
      name: 'totalTracks',
    },
    durationInMs: {
      type: GraphQLInt,
      name: 'durationInMs',
    },
    tracks: {
      type: new GraphQLList(GraphQLString),
      name: 'tracks',
    },
    active: {
      type: GraphQLBoolean,
      name: 'active',
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
  resolve: async (album, args) => {
    const query = buildPaginatedQuery(args, {
      integerSorts: ['durationInMs', 'totalTracks'],
      dateSorts: ['createdAt', 'updatedAt'],
    })

    const albums = await Album.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying albums')
    })

    const totalCount = await Album.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting albums')
    })

    if (albums && typeof totalCount !== undefined) {
      const cursor = albums.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        albums,
      }
    }
  },
}

module.exports = { albumQuery }

const buildPaginatedQuery = (
  { pageSize = 20, after, sort, sortOrder, searchTerm, ...args },
  { integerSorts, dateSorts }
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
    // artists: {
    //   [Op.contains]: [
    //     {
    //       // name: { [Op.iLike]: `%${searchTerm}%` },
    //       name: `${searchTerm}`,
    //     },
    //   ],
    // },
  }
  console.log('query ==='.toUpperCase(), query)
  return query
}
