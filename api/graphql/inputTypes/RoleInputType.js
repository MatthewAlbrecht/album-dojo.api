const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');

const RoleInputType = (type) => {
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
        userId: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        maxCount: {
          type: GraphQLInt,
        },
        createdFromTemplate: {
          type: GraphQLBoolean,
        },
      };
      break;
    case 'create':
      allGraphFields = {
        userId: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
        description: {
          type: GraphQLString,
        },
        maxCount: {
          type: GraphQLInt,
        },
        createdFromTemplate: {
          type: GraphQLBoolean,
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

  const roleInputType = new GraphQLInputObjectType({
    name: `RoleInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a RoleInputType',
    fields: allGraphFields,
  });

  return roleInputType;
};

module.exports = { RoleInputType };
