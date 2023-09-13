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
}
