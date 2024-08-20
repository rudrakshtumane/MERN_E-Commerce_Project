const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
// const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express();
const port = 5002;  

app.use(bodyParser.json());
app.use(express.json());

// database connection
mongoose.connect("mongodb://localhost:27017/MERN_E-Commerce" );  

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
});


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})  


app.use('/api/user',userRoutes);
app.use('/api', productRoutes);
