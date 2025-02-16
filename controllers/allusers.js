// /users/:userId/allusers

const express = require('express');
const router = express.Router();

const User = require("../models/user.js");


// INDEX
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.render('allusers/index.ejs', {
            users : allUsers,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// SHOW All users Pantry Index
router.get('/:userId', async (req, res) => {
    try {
        const allUser = await User.findById(req.session.user._id);
        const pantry = allUser.pantry.id(req.params.pantryId);
        res.render('allusers/show.ejs', {
            pantry : pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router;