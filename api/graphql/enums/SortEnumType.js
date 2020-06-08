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

const CodeSortEnumType = new GraphQLEnumType({
  name: 'codeSort',
  values: {
    code: { value: 'code' },
    name: { value: 'name' },
    updatedAt: { value: 'updatedAt' },
    createdAt: { value: 'createdAt' },
  },
})

const UserSortEnumType = new GraphQLEnumType({
  name: 'userSort',
  values: {
    username: { value: 'username' },
    email: { value: 'email' },
    updatedAt: { value: 'updatedAt' },
    createdAt: { value: 'createdAt' },
  },
})

module.exports = {
  SortEnumType,
  NameSortEnumType,
  CodeSortEnumType,
  UserSortEnumType,
}
