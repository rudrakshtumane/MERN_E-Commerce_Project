const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');


const app = express();
const port = 5002;  

app.use(bodyParser.json());
app.use(express.json());

// database connection
mongoose.connect("mongodb://localhost:27017/EVENT_MANAGEMENT" );  

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
});


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})  


app.use('/api',apiRoutes);
