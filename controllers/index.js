const express = require('express');
const router = express.Router();

// Import all routes
const userRoutes = require('./usersController')

router.get("/", (req, res) => {
    res.send("welcome")
})


// Use all routes
router.use('/api/users', userRoutes)

module.exports = router;