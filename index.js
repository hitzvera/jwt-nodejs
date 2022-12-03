import express, {json, urlencoded} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import userRoute from './routes/users.route.js'
import authRoute from './routes/auth.route.js'

 dotenv.config()
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

const PORT = process.env.PORT || 5000
const corsOptions = {credential:true, origin: process.env.URL || '*'}

app.use(cors(corsOptions))
app.use(json())
app.use(cookieParser())
app.use(urlencoded({extended: false}))

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth', authRoute)

app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
})