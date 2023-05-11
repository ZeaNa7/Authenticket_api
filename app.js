var express = require('express');
var express_graphql = require('express-graphql');
var app = express();
const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

const connectDb = async () => {
      try {
          const client = new Client({
              user: process.env.PGUSER,
              host: process.env.PGHOST,
              database: process.env.PGDATABASE,
              password: process.env.PGPASSWORD,
              port: process.env.PGPORT
          })
   
          await client.connect()
          const res = await client.query('SELECT * FROM events_stored')
          console.log(res)
          await client.end()
      } catch (error) {
          console.log(error)
      }
  }
   
  connectDb()
  

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));