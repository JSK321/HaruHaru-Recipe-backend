const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkAuthStatus = request => {
    if (!request.headers.authorization) {
        return false
    }

    const token = request.headers.authorization.split(" ")[1]
    const loggedInUser = jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return false
        } else {
            return data
        }
    })
    return loggedInUser
}

router.get("/", (req, res) => {
    db.User.findAll().then(users => {
        res.json(users)
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

router.post("/", (req, res) => {
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(newUser => {
        res.json(newUser)
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

router.post("/login", (req, res) => {
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if (!foundUser) {
            return res.status(404).send("Unable to find user")
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            const userTokenInfo = {
                email: foundUser.email,
                id: foundUser.id,
                name: foundUser.name
            }
            const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET, { expiresIn: "2h" })
            return res.status(200).json({ token: token })
        } else {
            return res.status(403).send("incorrect password")
        }
    })
})

router.put("/:id", (req,res) => {
    const loggedInUser = checkAuthStatus(req)
    if(!loggedInUser){
        return res.status(401).send("Please login first")
    }
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if(loggedInUser.id === user.id) {
            db.User.update({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, {
                where: {
                    id: user.id
                }
            }).then(editUser => {
                res.json(editUser)
            }).catch(err => {
                console.log(err)
                res.status(500).send("Unable to find profile")
            })
        } else {
            return res.status(401).send("Not your profile!")
        }
    })
})

router.delete("/:id", (req,res) => {
    const loggedInUser = checkAuthStatus(req)
    if(!loggedInUser){
        return res.status(401).send("Please login first")
    }
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if(loggedInUser.id === user.id){
            db.User.destroy({
                where: {
                    id: user.id
                }
            }).then(userDelete => {
                res.json(userDelete)
            }).catch(err => {
                console.log(err)
                return res.status(500).send("Unable to find user")
            })
        } else {
            return res.status(401).send("Not your profile!")
        }
    })
})

router.get("/secretProfile", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Invalid token")
    }
    db.User.findOne({
        where: {
            id: loggedInUser.id
        },
        include: [
            {
                model: db.Recipes,
            }
        ]
    }).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

module.exports = router