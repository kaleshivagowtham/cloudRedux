const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    genre : {
        type : [String],
        required : true
    },
    stock : {
        type : String,
        required: true,
        default: "Available"
    },
    excerpt : {
        type : String,
        required : true
    },
})

module.exports = mongoose.model("Books", booksSchema);