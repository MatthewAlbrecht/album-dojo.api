const merge = require('lodash.merge');

const { ActionType } = require('../types');
const { Action } = require('../../models');
const { ActionInputType } = require('../inputTypes');

const createAction = {
  type: ActionType,
  description: 'The mutation that allows you to create a new Action',
  args: {
    action: {
      name: 'action',
      type: ActionInputType('create'),
    },
  },
  resolve: async (_, { action }) => {
    const createdAction = await Action.create(action);

    if (!createdAction) {
      throw new Error('Action could not be created!');
    }

    return createdAction;
  },
};

const updateAction = {
  type: ActionType,
  description: 'The mutation that allows you to update an existing Action by Id',
  args: {
    action: {
      name: 'action',
      type: ActionInputType('update'),
    },
  },
  resolve: async (_, action) => {
    const foundAction = await Action.findByPk(action.id);

    if (!foundAction) {
      throw new Error(`Action with id: ${action.id} not found!`);
    }

    const updatedAction = merge(foundAction, {
      name: action.name,
      code: action.code,
      description: action.description,
      level: action.level,
      points: action.points,
    });

    return foundAction.update(updatedAction);
  },
};

const deleteAction = {
  type: ActionType,
  description: 'The mutation that allows you to delete a existing Action by Id',
  args: {
    action: {
      name: 'action',
      type: ActionInputType('delete'),
    },
  },
  resolve: async (value, { id }) => {
    const foundAction = await Action.findByPk(id);

    if (!foundAction) {
      throw new Error(`Action with id: ${id} not found!`);
    }

    await Action.destroy({
      where: {
        id,
      },
    });

    return foundAction;
  },
};

module.exports = {
  createAction,
  updateAction,
  deleteAction,
};
