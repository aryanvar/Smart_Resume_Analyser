const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

// Global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

const authRoutes = require('./routes/auth')
const resumeRoutes = require('./routes/resume')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

// Mount routes
app.use('/api/auth', authRoutes)
app.use('/api/resume', resumeRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))