const express = require('express');
const mongoose = require('mongoose');
const Books = require('../models/books');
const Admin = require('../models/admins');
const router = express.Router();

router.get('/getbooks', (req, res) => {
    
    Books.find({stock: "Available"})
    .then(books => {
        if(books)
            return res.status(200).json({books});
    })
    .catch(err => console.log(err));
})

router.post('/getthebook', (req,res) => {

    const {bookId} = req.body;
    console.log(bookId);
    Books.find({'_id': bookId})
    .then(book => {
        console.log(book);
        if(book)
            return res.status(200).json(book);
        else
            return res.status(404).json("Book Not Found");
    })
})

router.post('/getlibrarian', (req,res) => {

    const {librarianId} = req.body;
    console.log(librarianId);
    Admin.findOne({username: librarianId})
    .then(librarian => {
        console.log(librarian);
        if(librarian)
            return res.status(200).json(librarian);
        else
            return res.status(404).json("Librarian Not Found");
    })
    .catch(err => console.log(err.message));
})

router.post('/getlibbooks', (req,res) => {

    const {booksAdded} = req.body;
    console.log("booksAdded: ",booksAdded);
    Books.find({_id: {$in : booksAdded}})
    .then(books => {
        console.log(books);
        if(books)
            return res.status(200).json(books);
        else
            return res.status(404).json("Book Not Found");
    })
    .catch(err => console.log(err.message));
})

router.delete('/deletebook', (req,res) => {
    const {bookId} = req.body;
    Books.deleteOne({ _id : bookId })
    .then( result => 
        console.log(result)
    );
})

router.post('/addbook', (req,res) => {
    const {title,author,excerpt,genres} = req.body.books;
    const newBook = new Books({
        title : title,
        author : author,
        excerpt: excerpt
    })
    console.log(req.body.books);

    newBook.save()
    .then(saved => {
        if(saved)
            return res.status(200).json("Saved");
        else 
            return res.status(200).json("Not Saved");
    })
})

router.put('/updatebook', (req,res) => {
    const {title,author,excerpt,genres} = req.body.books;
    const id = req.body.id;

    console.log(req.body.books);
    Books.findOneAndUpdate({_id: id},{
        title : title,
        author: author,
        excerpt: excerpt,
        genres: genres
    })
    .then((saved) => {
        if(saved)
            return res.status(200).json("Updated");
    })
})

module.exports = router;