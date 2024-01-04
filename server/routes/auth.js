import exp from "express";
import { login as loginUser } from "../controllers/auth.js";

const route = exp.Router();

route.post("/login", loginUser);

export default route;
