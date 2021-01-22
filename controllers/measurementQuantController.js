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
    db.MeasurementQuant.findAll({
        include: [
            db.MeasurementUnit,
            db.Ingredients
        ]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find measurement quantity")
    })
})

router.get("/:id", (req, res) => {
    db.MeasurementQuant.findOne({
        where: {
            id: req.params.id
        },
        include: [
            db.MeasurementUnit,
            db.Ingredients
        ]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find measurement quantity")
    })
})

router.post("/", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.MeasurementQuant.create({
        quantAmount: req.body.quantAmount,
        RecipeIngredientId: req.body.RecipeIngredientId,
        UserId: loggedInUser.id
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to create new measurement quantity")
    })
})

router.put("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.MeasurementQuant.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (loggedInUser.id === data.UserId) {
            db.MeasurementQuant.update({
                quantAmount: req.body.quantAmount
            },
                {
                    where: {
                        id: data.id
                    }
                }).then(result => {
                    res.json(result)
                }).catch(err => {
                    console.log(err)
                    res.status(500).send("Unable to find measurement quantity")
                })
        } else {
            return res.status(401).send("Not your recipe!")
        }
    })
})

router.delete("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.MeasurementQuant.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if (loggedInUser.id === data.UserId) {
            db.MeasurementQuant.destroy({
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