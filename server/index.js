require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const postRouter = require('./routers/postRouter')
const userRouter = require('./routers/userRouter')
const fileUpload = require('express-fileupload')
const likesRouter = require('./routers/likesRouter')

const PORT = process.env.PORT || 7000

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))

app.use('/api', postRouter)
app.use('/user', userRouter)
app.use('/api', likesRouter)

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
    } catch(e) {
        console.log(e)
    }
}

startApp()