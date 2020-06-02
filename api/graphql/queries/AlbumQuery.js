const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType,
} = require('graphql')
const { Op } = require('sequelize')
const sequelize = require('sequelize')
const { GraphQLJSONObject } = require('graphql-type-json')

const { SortOrderEnumType } = require('../enums')
const { AlbumConnection } = require('../connections')
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
        name: 'albumSort',
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
      type: SortOrderEnumType,
    },
    id: {
      type: GraphQLID,
      name: 'id',
    },
    spotifyId: {
      type: GraphQLString,
      name: 'spotifyId',
    },
    duplicateSpotifyIds: {
      type: new GraphQLList(GraphQLString),
      name: 'duplicateSpotifyIds',
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
      searchTermStatement: [
        {
          name: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
        {
          spotifyId: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
        sequelize.where(sequelize.cast(sequelize.col('artists'), 'text'), {
          [Op.iLike]: `%${args.searchTerm}%`,
        }),
      ],
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
