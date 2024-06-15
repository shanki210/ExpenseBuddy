import express from "express";
import { register, login, getUser } from "../controllers/user.js";
import { protect } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/getuser",protect,getUser);


export default router