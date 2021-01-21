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
    db.recipeIngredients.findAll({
        include: [
            db.measurementQuant,
            db.measurementUnit,
            db.Ingredients
        ]
    }).then(ingredients => {
        res.json(ingredients)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find ingredients")
    })
})

router.get("/:id", (req, res) => {
    db.recipeIngredients.findOne({
        where: {
            id: req.params.id
        },
        include: [
            db.measurementQuant,
            db.measurementUnit,
            db.Ingredients
        ]
    }).then(foundIngredient => {
        res.json(foundIngredient)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find ingredients")
    })
})

// router.post("/", (req, res) => {
//     const loggedInUser = checkAuthStatus(req)
//     if(!loggedInUser){
//         return res.status(401).send("Please login first")
//     }
//     db.recipeIngredients.create({

//     })
// })

module.exports = router;