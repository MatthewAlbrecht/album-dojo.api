const merge = require('lodash.merge');

const { ListType } = require('../types');
const { List } = require('../../models');
const { ListInputType } = require('../inputTypes');

const createList = {
  type: ListType,
  description: 'The mutation that allows you to create a new List',
  args: {
    list: {
      name: 'list',
      type: ListInputType('create'),
    },
  },
  resolve: async (_, { list }) => {
    const createdList = await List.create(list);

    if (!createdList) {
      throw new Error('List could not be created!');
    }

    return createdList;
  },
};

const updateList = {
  type: ListType,
  description: 'The mutation that allows you to update an existing List by Id',
  args: {
    list: {
      name: 'list',
      type: ListInputType('update'),
    },
  },
  resolve: async (_, list) => {
    const foundList = await List.findByPk(list.id);

    if (!foundList) {
      throw new Error(`List with id: ${list.id} not found!`);
    }

    const updatedList = merge(foundList, {
      name: list.name,
      description: list.description,
      maxCount: list.maxCount,
      createdFromTemplate: list.createdFromTemplate,
    });

    return foundList.update(updatedList);
  },
};

const deleteList = {
  type: ListType,
  description: 'The mutation that allows you to delete a existing List by Id',
  args: {
    list: {
      name: 'list',
      type: ListInputType('delete'),
    },
  },
  resolve: async (value, { id }) => {
    const foundList = await List.findByPk(id);

    if (!foundList) {
      throw new Error(`List with id: ${id} not found!`);
    }

    await List.destroy({
      where: {
        id,
      },
    });

    return foundList;
  },
};

module.exports = {
  createList,
  updateList,
  deleteList,
};
