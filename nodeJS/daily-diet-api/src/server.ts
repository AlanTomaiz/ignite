import fastify from 'fastify'
import cookies from '@fastify/cookie'
import { UsersRoutes } from './routes/users.routes'

const app = fastify()

app.get('/', () => {
  return 'Hello World'
})

app.register(cookies)
app.register(UsersRoutes, { prefix: '/users' })

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Rinning!')
})
