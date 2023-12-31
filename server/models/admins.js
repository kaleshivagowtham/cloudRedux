const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    booksAdded : {
        type : [String],
        required : true
    }
})

module.exports = mongoose.model("Admin", adminSchema);