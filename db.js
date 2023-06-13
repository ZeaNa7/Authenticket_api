import dotenv from "dotenv";
import pkg from 'pg'
const { Client } = pkg;

dotenv.config();

const createClient = () => {
  return new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
};

export const connect = async () => {
  const client = createClient();
  await client.connect();
  return client;
};

export const disconnect = async (client) => {
  await client.end();
};

export default {
  createClient,
  connect,
  disconnect,
};