const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

const ActionInputType = (type) => {
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
        points: {
          type: GraphQLInt,
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
        imageUrl: {
          type: GraphQLString,
        },
        level: {
          type: GraphQLInt,
        },
        points: {
          type: GraphQLInt,
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

  const actionInputType = new GraphQLInputObjectType({
    name: `ActionInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a ActionInputType',
    fields: allGraphFields,
  });

  return actionInputType;
};

module.exports = { ActionInputType };
