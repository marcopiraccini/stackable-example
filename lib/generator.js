'use strict'

const { Generator: ServiceGenerator } = require('@platformatic/service')
const { schema } = require('./schema')

class StackableExampleGenerator extends ServiceGenerator {
  getDefaultConfig () {
    const defaultBaseConfig = super.getDefaultConfig()
    const defaultConfig = {
      greeting: 'Hello world!'
    }
    return Object.assign({}, defaultBaseConfig, defaultConfig)
  }

  async _getConfigFileContents () {
    const baseConfig = await super._getConfigFileContents()
    const config = {
      $schema: './stackable.schema.json',
      greeting: {
        text: '{PLT_GREETING_TEXT}'
      }
    }
    return Object.assign({}, baseConfig, config)
  }

  async _beforePrepare () {
    super._beforePrepare()

    this.config.env = {
      PLT_GREETING_TEXT: this.config.greeting ?? 'Hello world!',
      ...this.config.env
    }
  }

  async _afterPrepare () {
    this.addFile({
      path: '',
      file: 'stackable.schema.json',
      contents: JSON.stringify(schema, null, 2)
    })
  }
}

module.exports = StackableExampleGenerator
module.exports.Generator = StackableExampleGenerator
