const express = require('express');
const router = express.Router();

// Import all routes
const userRoutes = require('./usersController')
const recipeRoutes = require('./recipesController')

router.get("/", (req, res) => {
    res.send("welcome")
})


// Use all routes
router.use('/api/users', userRoutes)
router.use('/api/recipes', recipeRoutes)

module.exports = router;