/* eslint-disable camelcase */
import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { checkHasSessionId } from '../middleware/check-has-session-id'

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const userCreateSchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = userCreateSchema.parse(req.body)

    const userData = {
      id: randomUUID(),
      name,
      email,
    }

    await knex('users').insert(userData)

    reply.cookie('sessionId', userData.id, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    // const { sessionId } = req.cookies
    // if (!sessionId) {
    //   reply.cookie('sessionId', userData.id, {
    //     path: '/',
    //     maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    //   })
    // }

    return reply.status(201).send()
  })

  app.get('/summary', { preHandler: [checkHasSessionId] }, async (req) => {
    const { sessionId } = req.cookies

    const results = await knex('meals')
      .count('*', { as: 'total' })
      .sum('diet', { as: 'on_diet' }) // On diet
      .where('user_id', sessionId)

      .with('sequence', (query) => {
        query
          .fromRaw(
            `(
                    SELECT diet, COUNT(*) AS TOTAL FROM (
                      SELECT TEMP.*, ROW_NUMBER() OVER (ORDER BY created_at) - ROW_NUMBER() OVER (PARTITION BY diet ORDER BY created_at) AS GRP FROM MEALS TEMP
                      WHERE user_id = '${sessionId}'
                    ) TEMP GROUP BY GRP, diet
        )`,
          )
          .where('diet', true)
          .max('TOTAL', { as: 'best_sequence' })
      })
      .join('sequence', knex.raw('1 = 1'))
      .select('sequence.best_sequence')
      .groupBy('sequence.best_sequence')
      .first()

    const { total, on_diet, best_sequence } = z
      .object({
        total: z.number(),
        on_diet: z.number(),
        best_sequence: z.number(),
      })
      .parse(results)

    const summary = {
      total,
      on_diet,
      not_on_diet: total - on_diet,
      best_sequence,
    }

    return { summary }
  })
}
