import knex from '../database'
import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import crypto from 'crypto'

const interval = 30

export default function (fastify: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void) {
  fastify.get('/users', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              user_id: {
                type: 'string'
              },
              name: {
                type: 'string'
              },
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const result = await knex<{ user_id: string, name: string }>('users')
      .select('id AS user_id', 'name')

    reply.code(200).send(result)
  })

  fastify.post<{ Body: { UserId: string, DateTime: string } }>('/users/generate_otp', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            UserId: {type: 'string' },
            Code: {type: 'string' },
            DateTime: {type: 'string' },
            Interval: { type: 'number' }
          }
        },
        400: {
          type: 'object',
          properties: {
            UserId: { type: 'string' },
            EmittedAt: { type: 'string' },
            NextInterval: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { UserId, DateTime } = request.body
    if (await knex('users').where({ id: UserId }).first() === undefined) {
      reply.code(401).send({
        UserId,
        Error: true
      })
    }

    const lastCode = await knex<{ user_id: string, start_timestamp: string }>('otps')
      .where({ user_id: UserId }).orderBy('start_timestamp', 'desc').first()

    const remaining = interval - (Date.now() - new Date(lastCode?.start_timestamp ?? 0).getTime()) / 1000
    if (remaining <= 0) {
      const otp = crypto.randomInt(0, 999999).toString().padStart(6, '0')

      const result = await knex<{ user_id: string, otp: string, start_timestamp: string }>('otps')
        .insert({ user_id: UserId, otp, start_timestamp: new Date(DateTime).toISOString() }).returning('*')

      reply.code(200).send({
        Code: result[0].otp,
        UserId: result[0].user_id,
        DateTime: result[0].start_timestamp,
        Interval: interval
      })
    } else {
      reply.code(400).send({
        UserId: lastCode?.user_id,
        EmittedAt: lastCode?.start_timestamp,
        NextInterval: remaining
      })
    }

  })

  fastify.post<{ Body: { UserId: string, Code: string } }>('/users/check_otp', {
    schema: {
      body: {
        type: 'object',
        properties: {
          UserId: { type: 'string' },
          Code: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            UserId: { type: 'string' },
            DateTime: { type: 'string' },
            Result: { type: 'boolean' }
          }
        },
        401: {
          type: 'object',
          properties: {
            UserId: { type: 'string' },
            DateTime: { type: 'string' },
            Result: { type: 'boolean' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { UserId, Code } = request.body

    const lastCode = await knex<{ user_id: string, otp:string, start_timestamp: string }>('otps')
      .where({ user_id: UserId }).orderBy('start_timestamp', 'desc').first()

    const remaining = interval - (Date.now() - new Date(lastCode?.start_timestamp ?? 0).getTime()) / 1000
    fastify.log.info(`Remaining: ${remaining} - ${Code === lastCode?.otp}`)
    if (remaining >= 0 && Code === lastCode?.otp) {
      reply.code(200).send({
        UserId: lastCode?.user_id,
        DateTime: lastCode?.start_timestamp,
        Result: true
      })
    } else {
      reply.code(401).send({
        UserId: lastCode?.user_id,
        DateTime: lastCode?.start_timestamp,
        Result: false
      })
    }
  })
  done()
}
