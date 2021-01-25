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

router.get("/", (req,res) => {
    db.Ingredients.findAll({
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(401).send("Unable to find ingredients")
    })
})

router.get("/:id", (req,res) => {
    db.Ingredients.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find ingredients")
    })
})

router.post("/", (req,res) => {
    const loggedInUser = checkAuthStatus(req)
    if(!loggedInUser){
        return res.status(401).send("Please login first")
    }
    db.Ingredients.create({
        ingredientName: req.body.ingredientName,
        RecipeId: req.body.RecipeId,    
        UserId: loggedInUser.id
    }).then(result => {
        res.json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to create new ingredient")
    })
})

router.put("/:id", (req,res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Ingredients.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if(loggedInUser.id === data.UserId){
            db.Ingredients.update({
                ingredientName: req.body.ingredientName,
                RecipeId: req.body.RecipeId
            },
            {
                where: {
                    id: data.id
                }
            }).then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
                res.status(500).send("Unable to find ingredient")
            })
        } else {
            return res.status(401).send("Not your recipe!")
        }
    })
})

router.delete("/:id", (req,res)=> {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Ingredients.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        if(loggedInUser.id === data.UserId){
            db.Ingredients.destroy({
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