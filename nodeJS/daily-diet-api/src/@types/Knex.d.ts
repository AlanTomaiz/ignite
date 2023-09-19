// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      created_at: Date
    }
    meals: {
      id: string
      user_id: string
      title: string
      description: string
      date: Date
      diet: boolean
      created_at: Date
    }
  }
}
