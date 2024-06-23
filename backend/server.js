import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './database/database.js'
import userRoutes from './routes/user.routes.js'
import expenseRoutes from './routes/expense.routes.js'

const app = express();
dotenv.config()
connectDB();
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/expense', expenseRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const port = 5000||process.env.PORT
app.listen(port, () => console.log('Server started on port 5000')) 