const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const UserAchievementInputType = (type) => {
  let allGraphFields = {};

  switch (type) {
    case 'delete':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      };
      break;
    case 'create':
      allGraphFields = {
        userId: {
          type: new GraphQLNonNull(GraphQLID),
        },
        achievementCode: {
          type: new GraphQLNonNull(GraphQLString),
        },
        listId: {
          type: GraphQLID,
        },
        userAlbumId: {
          type: GraphQLID,
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

  const userAchievementInputType = new GraphQLInputObjectType({
    name: `UserAchievementInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a UserAchievementInputType',
    fields: allGraphFields,
  });

  return userAchievementInputType;
};

module.exports = { UserAchievementInputType };
