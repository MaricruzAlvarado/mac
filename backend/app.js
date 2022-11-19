require('dotenv').config()
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { connectDB } = require("./db");
const cors = require("cors");

/**
 *
 *  Conexión a la base de datos
 *
 */

const app = express();
connectDB();

app.use(
  cors({
    origin:"*"}))

app.get("/", (req, res) => res.send("Welcome to my api"));
module.exports = app;

async function start() {
  //Toda aplicacion de Graphql necesita TypeDefs y Resolvers
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  app.get("*", (req, res) => res.status(484).send("Not found"))
  app.listen(process.env.PORT, () => {
    console.log("Server on port 3000", process.env.PORT);
  });
}
start();
