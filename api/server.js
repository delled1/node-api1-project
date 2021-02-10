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

// server.get("/users/:id", (req, res) => {
//     const user = db.findById(req.params.id)

//     if (user) {
//         res.json(user)
//     } else{
//         res.status(404).json({
//             message: "USER NOT FOUND"
//         })
//     }
// })

server.post("/users", (req, res) => {
    const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser)
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
