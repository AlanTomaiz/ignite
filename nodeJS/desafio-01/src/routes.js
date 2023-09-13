import { Database } from "./database.js";

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: '/tasks',
    handle: (req, res) => {
      const { title, description } = req.body

      database.insert({ title, description });

      return res.writeHead(201).end()
    }
  }
]
