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

// SHOW
router.get('/allUsersId', async (req, res) => {
    try {
        const allUser = await User.findById(req.session.user._id);
        const pantry = allUser.pantry.id(req.params.pantryId);
        res.render('allusers/show.ejs', {
            users : allUser,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports = router;