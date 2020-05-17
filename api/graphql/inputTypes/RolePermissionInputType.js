const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const RolePermissionInputType = (type) => {
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
        roleName: {
          type: new GraphQLNonNull(GraphQLID),
        },
        permissionName: {
          type: new GraphQLNonNull(GraphQLString),
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

  const rolePermissionInputType = new GraphQLInputObjectType({
    name: `RolePermissionInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a RolePermissionInputType',
    fields: allGraphFields,
  });

  return rolePermissionInputType;
};

module.exports = { RolePermissionInputType };
