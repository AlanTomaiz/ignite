
export class Database {
  #database = []

  insert(table, data) {
    if (this.#database[table]) {
      this.#database[table].push(data)
      return
    }

    this.#database[table] = [data]
  }
}
