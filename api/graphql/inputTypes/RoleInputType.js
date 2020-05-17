const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
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

  const roleInputType = new GraphQLInputObjectType({
    name: `RoleInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a RoleInputType',
    fields: allGraphFields,
  });

  return roleInputType;
};

module.exports = { RoleInputType };
