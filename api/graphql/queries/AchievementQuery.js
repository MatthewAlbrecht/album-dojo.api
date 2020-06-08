const { GraphQLString, GraphQLInt } = require('graphql')
const { Op } = require('sequelize')

const { SortOrderEnumType, CodeSortEnumType } = require('../enums')
const { AchievementConnection } = require('../connections')
const { Achievement } = require('../../models')

const achievementQuery = {
  type: AchievementConnection,
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
  resolve: async (achievement, args) => {
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

    const achievements = await Achievement.findAll(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error querying achievements')
    })

    const totalCount = await Achievement.count(query).catch(error => {
      console.log('error ==='.toUpperCase(), error)
      throw new Error('error counting achievements')
    })
    console.log(
      'achievements ==='.toUpperCase(),
      JSON.stringify(achievements, null, 2)
    )
    if (achievements && typeof totalCount !== undefined) {
      const cursor = achievements.length && achievements.slice(-1)[0][args.sort]
      const hasMore = totalCount > (args.pageSize || 20)
      return {
        hasMore,
        totalCount,
        cursor,
        achievements,
      }
    }
  },
}

module.exports = { achievementQuery }
