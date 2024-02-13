'use strict'

function generateGlobalTypesFile (npmPackageName) {
  return `import { FastifyInstance } from 'fastify'
import { StackableExampleConfig, PlatformaticApp } from '${npmPackageName}'
  
declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<StackableExampleConfig>
  }
}
`
}

module.exports = {
  generateGlobalTypesFile
}
