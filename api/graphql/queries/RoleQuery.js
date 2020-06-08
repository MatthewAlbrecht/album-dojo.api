const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
} = require('graphql')
const { Op } = require('sequelize')
const buildPaginatedQuery = require('../../../utils/queryBuilder')

const { SortOrderEnumType, NameSortEnumType } = require('../enums')
const { RoleConnection } = require('../connections')
const { Role } = require('../../models')

const roleQuery = {
  type: RoleConnection,
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
  resolve: async (role, args) => {
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

    const roles = await Role.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying roles')
    })

    const totalCount = await Role.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting roles')
    })

    if (roles && typeof totalCount !== undefined) {
      const cursor = roles.length && roles.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        roles,
      }
    }
  },
}

module.exports = { roleQuery }
