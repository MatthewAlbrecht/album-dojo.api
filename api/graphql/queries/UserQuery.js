const { GraphQLID, GraphQLString, GraphQLInt } = require('graphql')
const { Op } = require('sequelize')
const buildPaginatedQuery = require('../../../utils/queryBuilder')

const { SortOrderEnumType, UserSortEnumType } = require('../enums')
const { UserConnection } = require('../connections')
const { User } = require('../../models')

const userQuery = {
  type: UserConnection,
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
      type: UserSortEnumType,
    },
    sortOrder: {
      type: SortOrderEnumType,
    },
    id: {
      name: 'id',
      type: GraphQLID,
    },
    username: {
      name: 'username',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    firstName: {
      name: 'firstName',
      type: GraphQLString,
    },
    lastName: {
      name: 'lastName',
      type: GraphQLString,
    },
    role: {
      name: 'role',
      type: GraphQLString,
    },
    spotifyId: {
      name: 'spotifyId',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: async (user, args) => {
    const query = buildPaginatedQuery(args, {
      integerSorts: [],
      dateSorts: ['createdAt', 'updatedAt'],
      searchTermStatement: [
        {
          name: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
          description: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
      ],
    })

    const users = await User.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying users')
    })

    const totalCount = await User.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting users')
    })

    if (users && typeof totalCount !== undefined) {
      const cursor = users.length && users.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        users,
      }
    }
  },
}

module.exports = { userQuery }
