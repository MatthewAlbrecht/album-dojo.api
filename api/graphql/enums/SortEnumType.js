const { GraphQLEnumType } = require('graphql')

const SortEnumType = new GraphQLEnumType({
  name: 'sort',
  values: {
    updatedAt: { value: 'updatedAt' },
    createdAt: { value: 'createdAt' },
  },
})

const NameSortEnumType = new GraphQLEnumType({
  name: 'nameSort',
  values: {
    name: { value: 'name' },
    updatedAt: { value: 'updatedAt' },
    createdAt: { value: 'createdAt' },
  },
})

module.exports = { SortEnumType, NameSortEnumType }
