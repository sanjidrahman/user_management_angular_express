const express = require('express')
const app = express()
const userRoute = require('./routes/routes.js')
const db = require('./models/index.js')

const connection = async () => {
    try {
        for (const modelName of Object.keys(db.models)) {
            await db.models[modelName].sync();
            console.log(`Model '${modelName}' synced successfully`);
        }
    } catch (err) {

    }
}
connection()

app.use('/', userRoute)

app.listen(3000, () => console.log('Server Connected'))

