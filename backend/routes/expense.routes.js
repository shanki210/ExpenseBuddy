import express from "express";
import { addExpense, getExpense } from "../controllers/expense.js";
import { protect } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/addexpense",protect,addExpense);
router.get("/getexpense",protect,getExpense);

export default router