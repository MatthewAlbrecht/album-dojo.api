const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

const AchievementInputType = (type) => {
  let allGraphFields = {};

  switch (type) {
    case 'delete':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      };
      break;
    case 'update':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        name: {
          type: GraphQLString,
        },
        code: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        imageUrl: {
          type: GraphQLString,
        },
      };
      break;
    case 'create':
      allGraphFields = {
        name: {
          type: GraphQLString,
        },
        code: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        imageUrl: {
          type: GraphQLString,
        },
      };
      break;
    default:
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      };
  }

  const achievementInputType = new GraphQLInputObjectType({
    name: `AchievementInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a AchievementInputType',
    fields: allGraphFields,
  });

  return achievementInputType;
};

module.exports = { AchievementInputType };
