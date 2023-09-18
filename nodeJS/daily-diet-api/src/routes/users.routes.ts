import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'

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

    const { sessionId } = req.cookies
    if (!sessionId) {
      reply.cookie('sessionId', userData.id, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }
  })
}
