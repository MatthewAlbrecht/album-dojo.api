const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');

const AlbumInputType = (type) => {
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
        spotifyId: {
          type: GraphQLString,
        },
        isFeatured: {
          type: GraphQLBoolean,
        },
        spotifyData: {
          type: GraphQLJSONObject,
        },
      };
      break;
    case 'create':
      allGraphFields = {
        spotifyId: {
          type: GraphQLString,
        },
        isFeatured: {
          type: GraphQLBoolean,
        },
        spotifyData: {
          type: GraphQLJSONObject,
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

  const albumInputType = new GraphQLInputObjectType({
    name: `AlbumInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a AlbumInputType',
    fields: allGraphFields,
  });

  return albumInputType;
};

module.exports = { AlbumInputType };
