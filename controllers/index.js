const express = require('express');
const router = express.Router();

// Import all routes
const userRoutes = require('./usersController')
const recipeRoutes = require('./recipesController')
const ingredientRoutes = require('./recipeIngreController')
const measurementQuantRoutes = require('./measurementQuantController')

router.get("/", (req, res) => {
    res.send("welcome")
})


// Use all routes
router.use('/api/users', userRoutes)
router.use('/api/recipes', recipeRoutes)
router.use('/api/recipeIngre', ingredientRoutes)
router.use('/api/measurementQuant', measurementQuantRoutes)

module.exports = router;