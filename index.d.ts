import { FastifyInstance } from 'fastify'
import { PlatformaticApp } from '@platformatic/service'
import { StackableExampleConfig } from './config'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<StackableExampleConfig>
  }
}

export { PlatformaticApp, StackableExampleConfig }
