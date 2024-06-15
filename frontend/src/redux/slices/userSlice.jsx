import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export const login = createAsyncThunk('user/login', async ({ email, password, navigate, toast }, thunkAPI) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/v1/user/login', { email, password }, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        console.log(data)
        navigate('/home');
        toast({
            title: 'Login Successful',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

export const register = createAsyncThunk('user/register', async ({ name, email, password, image, navigate, toast }, thunkAPI) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('/api/v1/user/register', { name, email, password, image }, config);
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/home');
        toast({
            title: 'We have created your account',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: { userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}, loading: false, error: null },
    reducers: {
        logout: (state) => {
            state.userInfo = {};
            localStorage.removeItem('userInfo');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
