import exp from "express";
import { getFeedPosts as fetchFeedPosts, getUserPosts as fetchUserPosts, likePost as addLike } from "../controllers/posts.js";
import { verifyToken as checkToken } from "../middleware/auth.js";

const route = exp.Router();

route.get("/", checkToken, fetchFeedPosts);
route.get("/:userId/posts", checkToken, fetchUserPosts);

route.patch("/:id/like", checkToken, addLike);

export default route;

