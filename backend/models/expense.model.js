import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    date: { 
        type: Date,
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    transaction: { 
        type: String, 
        default: 'Expense'
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
}, {
    timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense