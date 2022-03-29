module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  entities: ["./src/modules/**/infra/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  cli: {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}