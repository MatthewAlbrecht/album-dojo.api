const { GraphQLString, GraphQLInt } = require('graphql')
const { Op } = require('sequelize')

const { SortOrderEnumType, CodeSortEnumType } = require('../enums')
const { ActionConnection } = require('../connections')
const { Action } = require('../../models')

const actionQuery = {
  type: ActionConnection,
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
      type: CodeSortEnumType,
    },
    sortOrder: {
      type: SortOrderEnumType,
    },
    name: {
      type: GraphQLString,
      name: 'name',
    },
    code: {
      type: GraphQLString,
      name: 'code',
    },
    description: {
      type: GraphQLString,
      name: 'description',
    },
    imageUrl: {
      type: GraphQLString,
      name: 'imageUrl',
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
  resolve: async (action, args) => {
    const query = buildPaginatedQuery(args, {
      integerSorts: [],
      dateSorts: ['createdAt', 'updatedAt'],
      searchTermStatement: [
        {
          name: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
        {
          code: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
        {
          description: {
            [Op.iLike]: `%${args.searchTerm}%`,
          },
        },
      ],
    })

    const actions = await Action.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying actions')
    })

    const totalCount = await Action.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting actions')
    })

    if (actions && typeof totalCount !== undefined) {
      const cursor = actions.length && actions.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        actions,
      }
    }
  },
}

module.exports = { actionQuery }
