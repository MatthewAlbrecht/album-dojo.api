/**
 * third party libraries
 */
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const helmet = require('helmet')
const http = require('http')
const mapRoutes = require('express-routes-mapper')
const Redis = require('ioredis')

/**
 * server configuration
 */
require('dotenv').config()
const config = require('../config/')
const dbService = require('./services/db.service')
const apolloContext = require('./helpers/apolloContext.helper')
const { schema } = require('./graphql')
const redis = new Redis()
// environment: development, testing, production
const environment = process.env.NODE_ENV

/**
 * express application
 */
const api = express()
const server = http.Server(api)
const mappedRoutes = mapRoutes(config.publicRoutes, 'api/controllers/')
const DB = dbService(environment, config.migrate, {
  alter: config.alter,
  force: config.force,
}).start()

// allow cross origin requests
// configure to allow only requests from certain origins
const corsOptions = {
  origin: 'localhost:3000',
  credentials: true, // <-- REQUIRED backend setting
}

api.use(cors())

// secure express app
api.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
)

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

// adding user information to req.context (will be used by apollo)
api.use('/', async (req, res, next) => {
  req.apolloContext = await apolloContext(req)
  next()
})

// adding redis store to request object
api.use('/', (req, res, next) => {
  req.redis = redis
  next()
})

// public REST API
api.use('/api', mappedRoutes)
// private GraphQL API
// api.post('/graphql', (req, res, next) => auth(req, res, next));

const graphQLServer = new ApolloServer({
  schema,
  context: async ({ req }) => {
    let context = await apolloContext(req)
    return {
      ...context,
      redis: req.redis,
    }
  },
})

graphQLServer.applyMiddleware({
  app: api,
  cors: {
    origin: true,
    credentials: true,
    methods: ['POST'],
    allowedHeaders: [
      'X-Requested-With',
      'X-HTTP-Method-Override',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
  },
  bodyParserConfig: true,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
})

server.listen(config.port, () => {
  if (
    environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    // eslint-disable-next-line no-console
    console.error(
      `NODE_ENV is set to ${environment}, but only production and development are valid.`
    )
    process.exit(1)
  }
  return DB
})
