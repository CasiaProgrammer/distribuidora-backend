const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function hashPasswords() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin1234*',
    database: 'distribuidora'
  });

  const usuarios = [
    { id: 1, password: 'Admin123*' },
    { id: 2, password: 'Admin1234*' },
    { id: 3, password: 'KR1*' },
  ];

  for (const u of usuarios) {
    const hash = await bcrypt.hash(u.password, 10);
    await conn.query('UPDATE usuarios SET password = ? WHERE id = ?', [hash, u.id]);
    console.log(`Usuario ${u.id} actualizado`);
  }

  console.log('¡Listo!');
  await conn.end();
}

hashPasswords();