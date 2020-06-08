const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql')
const { Op } = require('sequelize')
const buildPaginatedQuery = require('../../../utils/queryBuilder')

const { SortOrderEnumType, NameSortEnumType } = require('../enums')
const { PermissionConnection } = require('../connections')
const { Permission } = require('../../models')

const permissionQuery = {
  type: PermissionConnection,
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
      name: 'id',
      type: GraphQLID,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
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
  resolve: async (permission, args) => {
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

    const permissions = await Permission.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying permissions')
    })

    const totalCount = await Permission.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting permissions')
    })

    if (permissions && typeof totalCount !== undefined) {
      const cursor = permissions.length && permissions.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        permissions,
      }
    }
  },
}

module.exports = { permissionQuery }
