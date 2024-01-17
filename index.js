const { schema, platformaticService } = require('@platformatic/service')

/**  @type {import('fastify').FastifyPluginAsync<{}>} */
async function foo (app, opts) {
  const text = app.platformatic.config.foo.text
  app.get('/foo', async (request, reply) => {
    return text
  })

  await app.register(platformaticService, opts)

  app.get('/', async (request, reply) => {
    return 'Your new root endpoint'
  })
}

foo.configType = 'stackable-test'

// break Fastify encapsulation
foo[Symbol.for('skip-override')] = true

// The schema for our configuration file
foo.schema = {
  $id: 'https://example.com/schemas/foo.json',
  title: 'Foo Service',
  type: 'object',
  properties: {
    server: schema.server,
    plugins: schema.plugins,
    metrics: schema.metrics,
    watch: {
      anyOf: [schema.watch, {
        type: 'boolean'
      }, {
        type: 'string'
      }]
    },
    $schema: {
      type: 'string'
    },
    extends: {
      type: 'string'
    },
    foo: {
      type: 'object',
      properties: {
        text: {
          type: 'string'
        }
      },
      required: ['text']
    }
  },
  additionalProperties: false,
  required: ['server']
}

// The configuration for the ConfigManager
foo.configManagerConfig = {
  schema: foo.schema,
  envWhitelist: ['PORT', 'HOSTNAME'],
  allowToWatch: ['.env'],
  schemaOptions: {
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    strict: false
  }
}

module.exports = foo
