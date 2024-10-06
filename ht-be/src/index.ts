import cors from "cors";
import "dotenv/config";
import express from "express";
import postRouter from "./modules/posts/post-controller";

const port = process.env.PORT || "4000";

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (
      !origin ||
      origin.startsWith("http://192.168.") ||
      origin.startsWith("http://localhost")
    ) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
};

const app = express().use(cors(corsOptions)).use(express.json());

app.use("/posts", postRouter);

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Express listening on port: ${port}`);
});
