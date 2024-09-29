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

    allPosts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return allPosts.map((post) => {
      const date = new Date(post.timestamp);

      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );

      return {
        ...post,
        timestamp: formattedDate.replace(",", ""),
      };
    });
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
