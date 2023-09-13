import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = []

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => this.#database = JSON.parse(data))
      .catch(() => this.#persist())
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(id) {
    if (id) {
      return this.#database.find(row => row.id === id)
    }

    return this.#database
  }

  insert(data) {
    const row = {
      id: randomUUID(),
      ...data,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.#database.push(row)

    this.#persist()
  }

  update(id, data) {
    const indexOf = this.#database.findIndex(row => row.id === id)

    if (indexOf > -1) {
      const row = this.#database[indexOf]

      this.#database[indexOf] = {
        ...row,
        ...data,
        updated_at: new Date(),
      }

      this.#persist()
    }
  }

  delete(id) {
    const indexOf = this.#database.findIndex(row => row.id === id)

    if (indexOf > -1) {
      this.#database.splice(indexOf, 1)

      this.#persist()
    }
  }
}
