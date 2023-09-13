import http from 'node:http'
import { json } from './middleware/json.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if (route) {
    const { groups } = url.match(route.path)

    req.params = groups ?? {}

    return route.handle(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
