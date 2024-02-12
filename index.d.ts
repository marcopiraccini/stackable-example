import { FastifyInstance } from 'fastify'
import { PlatformaticApp } from '@platformatic/service'
import { TestStackableFixConfig } from './config'

declare module 'fastify' {
  interface FastifyInstance {
    platformatic: PlatformaticApp<TestStackableFixConfig>
  }
}
