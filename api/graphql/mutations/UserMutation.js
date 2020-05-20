const { UserInputError } = require('apollo-server-express')
const merge = require('lodash.merge')
const authService = require('../../services/auth.service')
const bcryptService = require('../../services/bcrypt.service')

const { UserType } = require('../types')
const { User } = require('../../models')
const { UserInputType } = require('../inputTypes')

const createUser = {
  type: UserType,
  description: 'The mutation that allows you to create a existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('create'),
    },
  },
  resolve: async (_, { user }) => {
    if (user.password !== user.password2) {
      throw new UserInputError("Bad Request: Passwords don't match")
    }

    const createdUser = await User.create(user)

    if (!createdUser) {
      throw new UserInputError('User could not be created!')
    }

    const token = authService().issue({ id: createdUser.id })
    return { ...createdUser.get(), token }
  },
}

const updateUser = {
  type: UserType,
  description: 'The mutation that allows you to update an existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('update'),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id)

    if (!foundUser) {
      throw new UserInputError(`User with id: ${user.id} not found!`)
    }

    const updatedUser = merge(foundUser, {
      username: user.username,
      email: user.email,
      spotifyId: user.spotifyId,
      isFeatured: user.isFeatured,
      role: user.role,
    })

    return foundUser.update(updatedUser)
  },
}

const deleteUser = {
  type: UserType,
  description: 'The mutation that allows you to delete a existing User by Id',
  args: {
    user: {
      name: 'user',
      type: UserInputType('delete'),
    },
  },
  resolve: async (_, { user }) => {
    const foundUser = await User.findByPk(user.id)

    if (!foundUser) {
      throw new UserInputError(`User with id: ${user.id} not found!`)
    }

    await User.destroy({
      where: {
        id: user.id,
      },
    })

    return foundUser
  },
}

const loginUser = {
  type: UserType,
  description: 'The mutation that allows you to login an existing User',
  args: {
    user: {
      name: 'user',
      type: UserInputType('login'),
    },
  },
  resolve: async (_, { user }) => {
    const { email, password } = user

    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        })

        if (!user) {
          throw new UserInputError('Bad Request: User not found')
        }

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({ id: user.id })
          return { token, ...user.get() }
        }

        throw new UserInputError('Unauthorized')
      } catch (err) {
        throw new UserInputError(err)
      }
    }

    throw new UserInputError("Bad Request: Email and password don't match")
  },
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  loginUser,
}
