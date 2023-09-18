import { Knex, knex as knexSetup } from 'knex'

export const databaseConfig: Knex.Config = {
  client: 'sqlite',
  connection: './database/db.db',
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}

export const knex = knexSetup(databaseConfig)
