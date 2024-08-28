const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');



const app = express();
const port = 5002;  

app.use(bodyParser.json());
app.use(express.json());

// database connection
mongoose.connect("mongodb://localhost:27017/MERN_E-Commerce" );  

mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');
});



app.use(cors({ origin: 'http://localhost:5173' }));
app.use('/api/user',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/Categories', categoryRoutes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})  
