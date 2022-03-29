import { createConnection } from 'typeorm';

const execute = async () => {
  const conn = await createConnection();
  await conn.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
  conn.close();
};

execute().finally(() => console.log('DROP SCHEMA executed with success!!!'));
