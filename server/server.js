const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')
const resumeRoutes = require('./routes/resume')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))