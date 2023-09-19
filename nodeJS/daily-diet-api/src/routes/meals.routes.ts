import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { checkHasSessionId } from '../middleware/check-has-session-id'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', checkHasSessionId)

  app.get('/', async (req) => {
    const { sessionId } = req.cookies

    const meals = await knex('meals').where({ user_id: sessionId }).select('*')

    return { meals }
  })

  app.get('/:id', async (req) => {
    const { sessionId } = req.cookies

    const { id } = z.object({ id: z.string() }).parse(req.params)

    const meal = await knex('meals')
      .where({ id, user_id: sessionId })
      .select('*')
      .first()

    return { meal }
  })

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
      date: new Date(date).toISOString(),
      diet,
    })

    return reply.status(201).send()
  })

  app.put('/:id', async (req, reply) => {
    const { sessionId } = req.cookies

    const { id } = z.object({ id: z.string() }).parse(req.params)

    const dietDTO = z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      diet: z.coerce.boolean(),
    })

    const { title, description, date, diet } = dietDTO.parse(req.body)

    await knex('meals')
      .update({
        title,
        description,
        date: new Date(date).toISOString(),
        diet,
      })
      .where({ id, user_id: sessionId })
  })

  app.delete('/:id', async (req, reply) => {
    const { sessionId } = req.cookies

    const { id } = z.object({ id: z.string() }).parse(req.params)

    await knex('meals').delete().where({ id, user_id: sessionId })
  })
}
