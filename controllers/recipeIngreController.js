const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false
    }
    // splits the Bearer token into an array, get token by getting index of 1
    const token = request.headers.authorization.split(" ")[1]

    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return false
        } else {
            return data
        }
    });
    console.log(loggedInUser)
    return loggedInUser
}

router.get("/", (req, res) => {
    db.RecipeIngredients.findAll({
        include: [
            db.MeasurementQuant,
            // db.MeasurementUnit,
            db.Ingredients,
            // db.Steps
        ]
    }).then(ingredients => {
        res.json(ingredients)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find ingredients")
    })
})

router.get("/:id", (req, res) => {
    db.RecipeIngredients.findOne({
        where: {
            id: req.params.id
        },
        include: [
            db.MeasurementQuant,
            // db.measurementUnit,
            db.Ingredients
        ]
    }).then(foundIngredient => {
        res.json(foundIngredient)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find ingredients")
    })
})

router.post("/", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.RecipeIngredients.create({
        ingredientId: req.body.ingredientId,
        // measurementUnitId: req.body.measurementUnitId,
        measurementQuantId: req.body.measurementQuantId,
        RecipeId: req.body.RecipeId
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to create new recipe")
    })
})

router.put("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.RecipeIngredients.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (loggedInUser.id === data.RecipeId) {
            db.RecipeIngredients.update({
                ingredientId: req.body.ingredientId,
                measurementQuantId: req.body.measurementQuantId
            },
                {
                    where: {
                        id: data.id
                    }
                }).then(result => {
                    res.json(result)
                }).catch(err => {
                    console.log(err)
                    res.status(500).send("Unable to update recipe")
                })
        } else {
            return res.status(401).send("Not your recipe!")
        }
    })
})

router.delete("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req);
    if (!loggedInUser) {
        return res.status(401).send("Please login first,")
    }
    db.RecipeIngredients.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (loggedInUser.id === data.RecipeId) {
            db.RecipeIngredients.destroy({
                where: {
                    id: data.id
                }
            }).then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
                res.status(500).send("Unable to find recipe")
            })
        } else {
            return res.status(401).send("Not your recipe!")
        }
    })
})

module.exports = router;