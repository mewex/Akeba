import exp from "express";
import {
  getUser as fetchUser,
  getUserFriends as fetchUserFriends,
  addRemoveFriend as toggleFriend,
} from "../controllers/users.js";
import { verifyToken as confirmToken } from "../middleware/auth.js";

const route = exp.Router();

route.get("/:id", confirmToken, fetchUser);
route.get("/:id/friends", confirmToken, fetchUserFriends);

route.patch("/:id/:friendId", confirmToken, toggleFriend);

export default route;

