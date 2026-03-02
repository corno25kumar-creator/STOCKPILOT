import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import {connectDb}from "./config/db.js";
import { typeDefs, resolvers } from "./graphql/schema.js";


dotenv.config()

const app = express()
const httpServer = http.createServer(app)
await connectDb();

const apolloserver = new ApolloServer({
    typeDefs,
    resolvers
})

await apolloserver.start();

app.use(cors())
app.use(express.json())

app.use(
    "/graphql",
    expressMiddleware(apolloserver)
)

// Health check route (very important for Render)
app.get("/", (req, res) => {
  res.send("StockPilot API Running 🚀");
});


const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});