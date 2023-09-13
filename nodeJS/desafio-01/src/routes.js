import { Database } from "./database.js";
import { BuildRoutePath } from "./utils/build-route-path.js";

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: BuildRoutePath('/tasks'),
    handle: (req, res) => {
      const { title, description } = req.body

      database.insert({ title, description });

      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: BuildRoutePath('/tasks'),
    handle: (req, res) => {
      const tasks = database.select()

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: BuildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update(id, { title, description })

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PATCH',
    path: BuildRoutePath('/tasks/:id/complete'),
    handle: (req, res) => {
      const { id } = req.params

      database.complete(id)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: BuildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params

      database.delete(id)

      return res.writeHead(201).end()
    }
  }
]
