'use strict'

const { schema } = require('@platformatic/service')

const testStackableFixSchema = {
  ...schema.schema,
  $id: 'test-stackable-fix',
  title: 'Test Stackable Fix Config',
  properties: {
    ...schema.schema.properties,
    module: { type: 'string' },
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

module.exports.schema = testStackableFixSchema

if (require.main === module) {
  console.log(JSON.stringify(testStackableFixSchema, null, 2))
}
