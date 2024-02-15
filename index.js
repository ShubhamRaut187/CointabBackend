const express = require('express');
const cors = require('cors');

// Routes
const {UserRoutes} = require('./Routes/UserRoutes')
const {PostRoutes} = require('./Routes/PostRoutes');

// Initialize Server
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to backend!');
})
// Routes
app.use('/users',UserRoutes);
app.use('/posts',PostRoutes);

// Server Connection on port 8000
app.listen(process.env.PORT,()=>{
    console.log('Server running on port 8000');
})