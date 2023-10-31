const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

app.use(cors());

const PORT = 5000;

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://0.0.0.0:27017/book-app',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.on('connected' , () => {
    console.log("Db connected successfully");
})
mongoose.connection.on('error' , (err) => {
    console.log("Error occurred :",err);
})

app.use(express.json());
app.use(require('./routes/login'));
app.use(require('./routes/books'));

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}...`);
})