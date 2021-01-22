const express = require('express');
const router = express.Router();

// Import all routes
const userRoutes = require('./usersController')
const recipeRoutes = require('./recipesController')
const recipeIngreRoutes = require('./recipeIngreController')
const measurementQuantRoutes = require('./measurementQuantController')
const ingredientsRoutes = require('./ingredientsController')


router.get("/", (req, res) => {
    res.send("welcome")
})


// Use all routes
router.use('/api/users', userRoutes)
router.use('/api/recipes', recipeRoutes)
router.use('/api/recipeIngre', recipeIngreRoutes)
router.use('/api/measurementQuant', measurementQuantRoutes)
router.use('/api/ingredients', ingredientsRoutes)

module.exports = router;