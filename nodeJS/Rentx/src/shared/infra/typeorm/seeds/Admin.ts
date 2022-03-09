import { createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

const create = async () => {
  const conn = await createConnection();
  const id = uuidV4();
  const pass = await hash('123456', 8);

  await conn.query(`INSERT INTO USERS (id, name, password, email, driver_license, is_admin, created_at)
  VALUES ('${id}', 'ADMIN', '${pass}', 'admin@rentx.com.br', '1548752447', true, now())`);

  conn.close();
};

create().finally(() => console.log('Admin user is created with success!!!'));
