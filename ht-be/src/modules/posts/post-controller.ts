import { Router } from "express";
import { PostServices } from "./post-services";

const router = Router();
const postServices = new PostServices();

router.get("/", async (req, res) => {
  const allPosts = await postServices.getAllPosts();
  res.send(allPosts).status(200);
});

router.post("/new-post", async (req, res) => {
  const newPostRes = await postServices.createPost(req.body);
  res.send(newPostRes).status(204);
});

router.post("/upvote", async (req, res) => {
  const postId = req.query.postId;
  const upvotePost = await postServices.changeUpvote(postId as string);
  res.send(upvotePost).status(204);
});

export default router;
