require('dotenv').config()
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { connectDB } = require("./db");
const cors = require("cors");
const app = express();
app.use(cors({origin:'*'}))

connectDB();

app.get("/", (req, res) => res.send("Welcome to my Api"));
module.exports = app;

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.get("*", (req, res) => res.status(484).send("Not found"))
  app.listen(process.env.PORT, () => {
    console.log("Server on port ", process.env.PORT);
  });
}
start();
