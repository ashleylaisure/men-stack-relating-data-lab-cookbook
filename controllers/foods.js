// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js')

// Index
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
    
});

// New
router.get('/new', (req, res) => {
    res.render("foods/new.ejs")
});

// Delete
router.delete('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.pantryId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})
// Update
router.put('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.pantryId);
        pantry.set(req.body)
        await currentUser.save();
        // res.redirect(`/users/${currentUser._id}/foods/${req.params.pantryId}`);
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

// Create
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// Edit
router.get('/:pantryId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.pantryId);
        res.render('foods/edit.ejs', {
            pantry : pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// Show
router.get('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const pantry = currentUser.pantry.id(req.params.pantryId);
        res.render('foods/show.ejs', {
            pantry : pantry,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});




module.exports = router;