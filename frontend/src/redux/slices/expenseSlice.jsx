import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const addExpense = createAsyncThunk("expense/addExpense", async ({ date, amount, category, transaction }, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const { data } = await axios.post("/api/v1/expense/addexpense", { date, amount, category, transaction }, config);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

export const getExpense = createAsyncThunk("expense/getExpense", async (_, thunkAPI) => {   
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const { data } = await axios.get("/api/v1/expense/getexpense", config);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
});

const expenseSlice = createSlice({
    name: "expense",
    initialState: {
        expenses: [],
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expenses.push(action.payload);
            })  
            .addCase(addExpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getExpense.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getExpense.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.expenses = action.payload;
            })  
            .addCase(getExpense.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export default expenseSlice.reducer;
