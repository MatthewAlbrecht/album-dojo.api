const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
} = require('graphql');

const ListUserAlbumInputType = (type) => {
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
        rank: {
          type: GraphQLInt,
        },
      };
      break;
    case 'create':
      allGraphFields = {
        listId: {
          type: GraphQLID,
        },
        userAlbumId: {
          type: GraphQLID,
        },
        rank: {
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

  const listUserAlbumInputType = new GraphQLInputObjectType({
    name: `ListUserAlbumInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a ListUserAlbumInputType',
    fields: allGraphFields,
  });

  return listUserAlbumInputType;
};

module.exports = { ListUserAlbumInputType };
