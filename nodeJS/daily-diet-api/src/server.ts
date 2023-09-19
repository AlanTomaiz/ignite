import fastify from 'fastify'
import cookies from '@fastify/cookie'
import { UsersRoutes } from './routes/users.routes'
import { mealsRoutes } from './routes/meals.routes'

const app = fastify()

app.get('/', () => {
  return 'Hello World'
})

app.register(cookies)
app.register(UsersRoutes, { prefix: '/users' })
app.register(mealsRoutes, { prefix: '/meals' })

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Rinning!')
})
