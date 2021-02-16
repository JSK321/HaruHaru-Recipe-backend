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
    db.Users.findAll().then(users => {
        res.json(users)
    }).catch(err => {
        console.log(err)
        res.status(500).end()
    })
})

router.post("/", (req, res) => {
    db.Users.create({
        name: req.body.name,
        accountName: req.body.accountName,
        email: req.body.email,
        password: req.body.password
    }).then(newUser => {
        res.json(newUser)
    }).catch(err => {
        if (err.errors[0].message === "users.accountName must be unique") {
            return res.status(409).send("Account name is taken, please choose another accout name.")
        }
        else if (err.errors[0].message === "users.email must be unique") {
            return res.status(409).send("Email is already in use.")
        } else {
            res.status(500).end()
        }
    })
})

router.post("/login", (req, res) => {
    db.Users.findOne({
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
                name: foundUser.name,
                accountName: foundUser.accountName
            }
            const token = jwt.sign(userTokenInfo, process.env.JWT_SECRET, { expiresIn: "2h" })
            return res.status(200).json({ token: token })
        } else {
            return res.status(403).send("incorrect password")
        }
    })
})

router.put("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Users.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (loggedInUser.id === user.id &&
            bcrypt.compareSync(req.body.password, user.password) &&
            user.password !== req.body.newPassword &&
            req.body.newPassword === req.body.confirmNewPassword
        ) {
            db.Users.update({
                name: req.body.name,
                email: req.body.email,
                accountName: req.body.accountName,
                password: req.body.newPassword,
                profileImage: req.body.profileImage
            }, {
                where: {
                    id: user.id
                }
            }).then(editUser => {
                res.json(editUser)
            }).catch(err => {
                if (err.errors[0].message === "users.accountName must be unique") {
                    return res.status(409).send("Account name is taken, please choose another accout name.")
                }
                else if (err.errors[0].message === "users.email must be unique") {
                    return res.status(409).send("Email is already in use.")
                } else if (loggedInUser.id === user.id && bcrypt.compare(req.body.password, user.password)) {
                    return res.status(401).send("Incorrect password, please try again")
                }
                // else if (loggedInUser.id === user.id && bcrypt.compare(req.body.password, user.password)
                //     && req.body.newPassword !== req.body.confirmNewPassword) {
                //     return res.status(400).send("New password does not match, please try again")
                // }
                else {
                    return res.status(500).send("Unable to find profile")
                }
            })
        } else {
            return res.status(401).send("Not your profile!")
        }
    })
})

router.delete("/:id", (req, res) => {
    const loggedInUser = checkAuthStatus(req)
    if (!loggedInUser) {
        return res.status(401).send("Please login first")
    }
    db.Users.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (loggedInUser.id === user.id) {
            db.Users.destroy({
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
    db.Users.findOne({
        where: {
            id: loggedInUser.id
        },
        include: [
            db.Recipes,
            db.SavedRecipes,
            db.Ingredients,
            db.Steps
        ]
    }).then(user => {
        res.json(user)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.get("/profile/:accountName", (req, res) => {
    db.Users.findOne({
        where: {
            accountName: req.params.accountName
        },
        include: [
            db.Recipes,
            db.SavedRecipes,
            db.Ingredients,
            db.Steps
        ]
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find user")
    })
})

router.get("/:id", (req, res) => {
    db.Users.findOne({
        where: {
            id: req.params.id
        },
    }).then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err)
        res.status(500).send("Unable to find user")
    })
})

module.exports = router