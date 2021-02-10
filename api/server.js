// BUILD YOUR SERVER HERE
const express = require("express")
const db = require("./users/model")

const server = express()

server.use(express.json())


server.get("/users/" , (req, res) => {
    db.find()
    .then(users => {
    // console.log("Fetching:" res);
    res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ message: error });
    });
})

server.get("/users/:id", (req, res) => {
    const user = req.params.id

    db.findById(user)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: error})
    
    })

    
})

server.post("/users", (req, res) => {
    const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser)
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
