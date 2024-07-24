const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');
const cors = require('cors');

const app = express();
const port = 8000;
app.use(cors());

// Middleware
app.use(bodyParser.json());

// MongoDB connection

mongoose.connect('mongodb://adeel:asdzxc123@ac-gzaofpb-shard-00-00.rsu6py3.mongodb.net:27017,ac-gzaofpb-shard-00-01.rsu6py3.mongodb.net:27017,ac-gzaofpb-shard-00-02.rsu6py3.mongodb.net:27017/?ssl=true&replicaSet=atlas-137x1j-shard-0&authSource=admin&retryWrites=true&w=majority&appName=nodeclaus')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Routes
app.use('/api/data', dataRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
