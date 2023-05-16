var Express = require('express');
const { Client } = require("pg")
const BodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const { graphqlHTTP } = require('express-graphql');

const app = Express();
app.use(BodyParser.text({ type: "text/plain" }));

app.use(cors({
  /** Use this when web frontend / production **/
  // origin: 'https://example.com',

  /** Use this when local frontend / development **/
  origin: "http://localhost:8000",
}));

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
          const res = await client.query('SELECT * FROM "User" WHERE "id_user" = 1');
          console.log(res)
          await client.end()
      } catch (error) {
          console.log(error)
      }
  }
   
  connectDb()

  app.use('/graphql', graphqlHTTP({
    // schema,
    graphiql: true, // Pour activer l'interface GraphiQL (optionnel)
  }));
  

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));