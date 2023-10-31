const express = require('express');
const mongoose = require('mongoose');
const Admin = require('../models/admins');
const router = express.Router();

router.post('/signin' , (req , res) => {

    const {email, password} = req.body.loginCreds;
    if(!email || !password)
        return res.status(422).json("Please enter an email or password");

    Admin.findOne({email :email , password : password})
        .then((savedUser) => {
            if(savedUser)
                return res.status(200).json({loginStatus : "Login successful",username: savedUser.username, role : savedUser.role});
            else
                return res.status(422).json({loginStatus : "username or password incorrect"});
        })
})

router.post('/signup' , (req , res) => {
    const {email,password,username,name, role} = req.body.regDetails;
    if((!email && !username) || !name || !password || !role )
        return res.status(442).json("Please enter all the important details");
    Admin.findOne({email : email})
        .then(savedUser => {
            if(savedUser)
                return res.status(422).json("The user already exists");
            const user = new Admin({
                name : name,
                email : email,
                username : username,
                password : password,
                role : role
            })
            user.save().then(saved => {
                if(!saved)
                    return res.status(200).json("Some error occurred while");
                return res.status(200).json({'status' : "User saved successfully"});
            })
        })
    })

module.exports = router;