import { configureStore} from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import expenseSlice from './slices/expenseSlice'

const store = configureStore({
    reducer:{
        user: userSlice,
        expense: expenseSlice
    },
})

export default store