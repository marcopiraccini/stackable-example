'use strict'

const { Generator: ServiceGenerator } = require('@platformatic/service')
const { schema } = require('./schema')

class TestStackableFixGenerator extends ServiceGenerator {
  getDefaultConfig () {
    const defaultBaseConfig = super.getDefaultConfig()
    const defaultConfig = {
      greeting: 'Hello world!'
    }
    return Object.assign({}, defaultBaseConfig, defaultConfig)
  }

  getConfigFieldsDefinitions () {
    const serviceConfigFieldsDefs = super.getConfigFieldsDefinitions()
    return [
      ...serviceConfigFieldsDefs,
      {
        var: 'PLT_GREETING_TEXT',
        label: 'What should the stackable greeting say?',
        default: 'Hello world!',
        type: 'string',
        configValue: ''
      }
    ]
  }

  async _getConfigFileContents () {
    const baseConfig = await super._getConfigFileContents()
    const packageName = await this.getStackablePackageName()
    const config = {
      $schema: './stackable.schema.json',
      module: packageName,
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

  async getStackablePackageJson () {
    const packageJsonPath = join(__dirname, '..', 'package.json')
    const packageJson = await readFile(packageJsonPath, 'utf8')
    return JSON.parse(packageJson)
  }

  async getStackablePackageName () {
    const packageJson = await this.getStackablePackageJson()
    const packageName = packageJson.name
    if (!packageName) {
      throw new Error('Missing package name in package.json')
    }
    return packageName
  }
}

module.exports = TestStackableFixGenerator
module.exports.Generator = TestStackableFixGenerator
