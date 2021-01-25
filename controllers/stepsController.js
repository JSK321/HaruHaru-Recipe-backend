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
    db.Steps.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(401).send("Unable to find recipe directions")
    })
})

router.get("/:id", (req, res) => {
    db.Steps.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find recipe directions")
    })
})

router.post("/", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Steps.create({
        directions: req.body.directions,
        RecipeId: req.body.RecipeId,
        UserId: req.body.UserId
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to create recipe directions")
    })
})

router.put("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Steps.findOne({
        where: {
            id: req.params.id
        }
    }).then(foundSteps => {
        if (loggedInUser.id === foundSteps.UserId) {
            db.Steps.update({
                directions: req.body.directions
            },
                {
                    where: {
                        id: foundSteps.id
                    }
                }).then(updatedSteps => {
                    res.json(updatedSteps)
                }).catch(err => {
                    console.log(err)
                    res.status(500).send("Unable to find recipe")
                })
        } else {
            return res.status(401).send("Not your recipe!")
        }
    })
})

router.delete('/:id', (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Steps.findOne({
        where: {
            id: req.params.id
        }
    }).then(foundSteps => {
        if (loggedInUser.id === foundSteps.UserId) {
            db.Steps.destroy({
                where: {
                    id: req.params.id
                }
            }).then(removedSteps => {
                res.json(removedSteps)
            }).catch(err => {
                console.log(err)
                res.status(401).send("Not your recipe!")
            })
        } else {
            return res.status(401).send("Not your recipe!")
        }
    })
})

module.exports = router;