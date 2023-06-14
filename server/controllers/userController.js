const User = require('../models/userModel')
const mongoose = require('mongoose')

// get a user 

// TODO: Add logic for: username found, email found, and email login
const getUser = async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({username: username, password: password})

    if (!user) {

        return res.status(404).json({error: "Incorrect credentials. Please try again or make a new account."})
    }

    res.status(200).json(user)
}

// create a new user
const createUser = async(req, res) => {
    const {username, password, email} = req.body

    try{
        const user = await User.create({username: username, password: password, email: email })
        return res.status(200).json(user)
    }
    catch(error){
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
    
    
}

module.exports = {
    getUser,
    createUser    
}
