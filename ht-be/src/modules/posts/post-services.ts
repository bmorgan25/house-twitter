import { Router } from "express";
import { MongoClient } from "mongodb";
import pino from "pino";

const logger = pino();
const router = Router();
const client = new MongoClient(process.env.DATABASE_CONN || "");

router.get("/", async (req, res) => {
  logger.info("User called post-services /");

  await client.connect();

  const db = client.db("house_twitter");
  const posts = db.collection("ht_posts");

  const allPosts = await posts.find({}).toArray();

  await client.close();

  res.send(allPosts).status(200);
});

router.post("/new-post", async (req, res) => {
  logger.info("User called post-services /new-post");

  await client.connect();

  const db = client.db("house_twitter");
  const posts = db.collection("ht_posts");

  let newPost = req.body;
  newPost.timestamp = new Date().toISOString();

  const result = await posts.insertOne(newPost);

  res.send(result).status(204);
});

export default router;
