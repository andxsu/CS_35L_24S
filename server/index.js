const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const {mongoose} = require('mongoose');

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch(() => console.log('Database not connected', err))

const app = express();
//middleware
app.use(express.json())



app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
