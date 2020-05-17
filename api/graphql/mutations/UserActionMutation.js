const { UserActionType } = require('../types');
const { UserAction } = require('../../models');
const { UserActionInputType } = require('../inputTypes');

const createUserAction = {
  type: UserActionType,
  description: 'The mutation that allows you to create a existing UserAction by Id',
  args: {
    userAction: {
      name: 'userAction',
      type: UserActionInputType('create'),
    },
  },
  resolve: async (_, { userAction }) => {
    const createdUserAction = await UserAction.create(userAction);

    if (!createdUserAction) {
      throw new Error('UserAction could not be created!');
    }

    return createdUserAction;
  },
};

const deleteUserAction = {
  type: UserActionType,
  description: 'The mutation that allows you to delete a existing UserAction by Id',
  args: {
    userAction: {
      name: 'userAction',
      type: UserActionInputType('delete'),
    },
  },
  resolve: async (_, { userAction }) => {
    const foundUserAction = await UserAction.findByPk(userAction.id);

    if (!foundUserAction) {
      throw new Error(`UserAction with id: ${userAction.id} not found!`);
    }

    await UserAction.destroy({
      where: {
        id: userAction.id,
      },
    });

    return foundUserAction;
  },
};

module.exports = {
  createUserAction,
  deleteUserAction,
};
