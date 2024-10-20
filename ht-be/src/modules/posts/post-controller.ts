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

router.post("/vote", async (req, res) => {
  const postId = req.query.postId;
  const isUpvote = req.query.isUpvote;
  const upvotePost = await postServices.changeVote(
    postId as string,
    isUpvote === "true"
  );
  if (upvotePost) {
    res.send(upvotePost).status(200);
  } else {
    return res.status(404).json({ message: "Post not found" });
  }
});

export default router;
