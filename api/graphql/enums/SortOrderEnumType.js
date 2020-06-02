const { GraphQLEnumType } = require('graphql')

const SortOrderEnumType = new GraphQLEnumType({
  name: 'sortOrder',
  values: {
    ASC: { value: 'ASC' },
    DESC: { value: 'DESC' },
  },
})

module.exports = { SortOrderEnumType }
