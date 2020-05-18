const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { AchievementType } = require('../types');
const { Achievement } = require('../../models');

const achievementQuery = {
  type: new GraphQLList(AchievementType),
  args: {
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
    basePoints: {
      type: GraphQLInt,
      name: 'basePoints',
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
  resolve: (achievement, args) => Achievement.findAll({ where: args }),
};

module.exports = { achievementQuery };
