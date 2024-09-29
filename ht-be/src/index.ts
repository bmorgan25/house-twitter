import cors from "cors";
import "dotenv/config";
import express from "express";
import postRouter from "./modules/posts/post-controller";

const port = process.env.PORT || "4000";

const app = express()
  .use(cors({ origin: "http://localhost:4200" }))
  .use(express.json());

app.use("/posts", postRouter);

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Express listening on port: ${port}`);
});
