import { Router } from "express";
import { MongoClient } from "mongodb";
import pino from "pino";
import { NewPost } from "../../types/types";

export class PostServices {
  logger = pino();
  router = Router();
  client: MongoClient;

  constructor() {
    this.client = new MongoClient(process.env.DATABASE_CONN || "");
  }

  async getAllPosts() {
    this.logger.info("User called post-services /");

    await this.client.connect();

    const db = this.client.db("house_twitter");
    const posts = db.collection("ht_posts");

    const allPosts = await posts.find({}).toArray();

    await this.client.close();

    return allPosts;
  }

  async createPost(postData: NewPost) {
    this.logger.info("User called post-services /new-post");

    await this.client.connect();

    const db = this.client.db("house_twitter");
    const posts = db.collection("ht_posts");

    let newPost = postData as NewPost & { timestamp: string };
    newPost.timestamp = new Date().toISOString();

    const result = await posts.insertOne(newPost);
  }
}
