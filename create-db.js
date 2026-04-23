const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postsath123',
    database: 'postgres',
  });

  await client.connect();

  const result = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = 'libheros_demo'"
  );

  if (result.rowCount === 0) {
    await client.query('CREATE DATABASE libheros_demo');
    console.log('Base libheros_demo créée avec succès');
  } else {
    console.log('La base libheros_demo existe déjà');
  }

  await client.end();
}

createDatabase().catch((error) => {
  console.error('Erreur pendant la création de la base :', error);
});