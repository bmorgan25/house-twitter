import cors from "cors";
import express from "express";
import postRouter from "./modules/posts/post-services";

const port = process.env.PORT || "4000";

const app = express()
  .use(cors({ origin: "http://localhost:4200" }))
  .use(express.json());

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Express listening on port: ${port}`);
});
