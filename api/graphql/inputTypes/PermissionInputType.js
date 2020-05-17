const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const PermissionInputType = (type) => {
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
        description: {
          type: GraphQLString,
        },
      };
      break;
    case 'create':
      allGraphFields = {
        name: {
          type: GraphQLString,
        },
        description: {
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

  const permissionInputType = new GraphQLInputObjectType({
    name: `PermissionInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a PermissionInputType',
    fields: allGraphFields,
  });

  return permissionInputType;
};

module.exports = { PermissionInputType };
