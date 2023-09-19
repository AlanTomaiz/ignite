import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { checkHasSessionId } from '../middleware/check-has-session-id'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkHasSessionId)

  app.post('/', async (req, reply) => {
    const { sessionId } = req.cookies

    const dietDTO = z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      diet: z.coerce.boolean(),
    })

    const { title, description, date, diet } = dietDTO.parse(req.body)

    await knex('meals').insert({
      id: randomUUID(),
      title,
      user_id: sessionId,
      description,
      date,
      diet,
    })

    return reply.status(201).send()
  })
}
