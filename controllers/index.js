const express = require('express');
const router = express.Router();

// Import all routes
const userRoutes = require('./usersController')
const recipeRoutes = require('./recipesController')
const savedrecipeRoutes = require ('./savedrecipeController')
const ingredientsRoutes = require('./ingredientsController')
const stepsRoutes = require('./stepsController')


router.get("/", (req, res) => {
    res.send("welcome")
})


// Use all routes
router.use('/api/users', userRoutes)
router.use('/api/recipes', recipeRoutes)
router.use('/api/savedrecipes', savedrecipeRoutes)
router.use('/api/ingredients', ingredientsRoutes)
router.use('/api/steps', stepsRoutes)

module.exports = router;