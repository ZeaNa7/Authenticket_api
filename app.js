
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlHTTP } from "express-graphql";
import Express from "express";
import cors from "cors";
import resolvers from "./resolvers.js";

const app = Express();
const typeDefs = importSchema("./schema.graphql");
app.use(cors());
app.use(Express.json());
const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
});

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true,
})
);

app.listen(4000, () => {
  console.log("Express GraphQL Server Now Running On localhost")
});
