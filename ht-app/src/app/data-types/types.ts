export type GetAllPostsResponse = {
  _id: number;
  timestamp: string;
  content: string;
  downvotes: number;
  upvotes: number;
};

export type NewPost = {
  content: string;
  upvotes: number;
  downvotes: number;
};
