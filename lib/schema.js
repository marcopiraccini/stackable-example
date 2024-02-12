'use strict'

const { schema } = require('@platformatic/service')

const stackableExampleSchema = {
  ...schema.schema,
  $id: 'stackable-example',
  title: 'Stackable Example Config',
  properties: {
    ...schema.schema.properties,
    greeting: {
      type: 'object',
      properties: {
        text: {
          type: 'string'
        }
      },
      required: ['text'],
      additionalProperties: false
    }
  }
}

module.exports.schema = stackableExampleSchema

if (require.main === module) {
  console.log(JSON.stringify(stackableExampleSchema, null, 2))
}
