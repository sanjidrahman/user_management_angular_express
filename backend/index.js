const express = require('express')
const app = express()
const userRoute = require('./routes/routes.js')
const db = require('./models/index.js')
const morgan = require('morgan')
const cors = require('cors')
const errorMiddleware = require('./middleware/errorMiddleware.js')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors({
    origin: ['http://localhost:4200']
}))
app.use(errorMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const connection = async () => {
    try {
        for (const modelName of Object.keys(db.models)) {
            await db.models[modelName].sync();
            console.log(`Model '${modelName}' synced successfully`);
        }
    } catch (err) {
        console.log(err.message);
    }
}
connection()

app.use('/', userRoute)

app.listen(3000, () => console.log('Server Connected'))

