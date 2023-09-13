import { Database } from "./database.js";
import { BuildRoutePath } from "./utils/build-route-path.js";

const database = new Database()

const error = (message) => {
  return JSON.stringify({ message })
}

export const routes = [
  {
    method: 'GET',
    path: BuildRoutePath('/tasks'),
    handle: (req, res) => {
      const tasks = database.select()

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: BuildRoutePath('/tasks'),
    handle: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(404).end(error('title and description is required'))
      }

      database.insert({ title, description });

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: BuildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(404).end(error('title and description is required'))
      }

      const task = database.select(id);

      if (!task) {
        return res.writeHead(404).end(error('Tasks not found or not exists'))
      }

      database.update(id, { title, description })

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PATCH',
    path: BuildRoutePath('/tasks/:id/complete'),
    handle: (req, res) => {
      const { id } = req.params

      const task = database.select(id);

      if (!task) {
        return res.writeHead(404).end(error('Tasks not found or not exists'))
      }

      if (!task.completed_at) {
        database.update(id, { completed_at: new Date() })
      }

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: BuildRoutePath('/tasks/:id'),
    handle: (req, res) => {
      const { id } = req.params

      const task = database.select(id);

      if (!task) {
        return res.writeHead(404).end(error('Tasks not found or not exists'))
      }

      database.delete(id)

      return res.writeHead(201).end()
    }
  }
]
