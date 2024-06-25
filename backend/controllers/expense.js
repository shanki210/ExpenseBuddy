import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";
import asyncHandler from "express-async-handler";

export const addExpense = asyncHandler(async (req, res) => {
    const { date, amount, category, transaction } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        const newExpense = await Expense.create({
            date, 
            amount,
            category,
            transaction,
            user: req.user._id, 
        });
        if (newExpense) {
            res.status(201).json({
                _id: newExpense.id,
                date: newExpense.date,
                amount: newExpense.amount,
                category: newExpense.category,
                transaction: newExpense.transaction,
                user: newExpense.user,
            });
        } else {
            res.status(400);
            throw new Error("Invalid expense data");
        }   
    } else {
        res.status(404);
        throw new Error("User not found");
    }   
})


export const getExpense = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const expenses = await Expense.find({ user: req.user._id });
        if (expenses) {
            res.status(200).json(expenses);
        } else {
            res.status(404);
            throw new Error("No expenses found");
        }   
    } else {
        res.status(404);
        throw new Error("User not found");
    }   
})