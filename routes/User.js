const express = require('express');
const router = express.Router();
const { userById, updateProfile, getProfile } = require('../controllers/User');
const { requireLogin, isAuth } = require('../controllers/Auth')

router.get('/secret/:userId', requireLogin, isAuth, (req,res) => {
    res.json({
        user: req.profile
    })
})

router.get('/:userId', requireLogin, isAuth, getProfile)
router.put('/:userId', requireLogin, isAuth, updateProfile)

router.param('userId', userById)

module.exports = router