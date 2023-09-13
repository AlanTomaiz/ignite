import { randomUUID } from 'node:crypto'

export class Database {
  #database = []

  select() {
    return this.#database
  }

  insert(data) {
    const row = {
      id: randomUUID(),
      ...data,
      completed_at: null,
      created_at: new Date().toTimeString(),
      updated_at: new Date().toTimeString(),
    }

    this.#database.push(row)
  }

  update(id, data) {
    const indexOf = this.#database.findIndex(row => row.id === id)

    if (indexOf > -1) {
      const update = this.#database[indexOf]

      this.#database[indexOf] = {
        ...update,
        ...data,
        updated_at: new Date().toTimeString(),
      }
    }
  }

  complete(id) {
    const indexOf = this.#database.findIndex(row => row.id === id)

    if (indexOf > -1) {
      const update = this.#database[indexOf]

      this.#database[indexOf] = {
        ...update,
        completed_at: new Date().toTimeString(),
        updated_at: new Date().toTimeString(),
      }
    }
  }
}
