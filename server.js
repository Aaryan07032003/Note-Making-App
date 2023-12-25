const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRouter')

const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)

//Listen
const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

// Connect to MongoDB
const MONGODB_URL = 'mongodb+srv://aaryanbhatia2003:aaryan2003@notedb.1towj4v.mongodb.net/notes?retryWrites=true&w=majority'; // Replace with your MongoDB connection string

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
