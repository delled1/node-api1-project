// BUILD YOUR SERVER HERE
const express = require("express")
const db = require("./users/model")

const server = express()

server.use(express.json())


server.get("/users/" , (req, res) => {
    db.find()
    .then(users => {
    res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ message: error });
    });
})

server.get("/users/:id", async (req, res) => {

    const user = await db.findById(req.params.id)

    if (user) {
        res.status(200).json(user)
    } else{
        res.status(404).json({
            message: "User Not Found"
        })
    }
})

server.post("/users", (req, res) => {
    const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio
    })

    res.status(201).json(newUser)
})

server.delete("/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

    if (user) {
        db.remove(user.id)
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User Not Found"
        })
    }
})

// server.put("/users/:id", (req, res) => {
//     const user = db.findById(req.params.id)

//     db.findById(user)
//     .then(users => {
//         const updateUser = db.update(users.id, {
//             name: req.body.name,
//             bio: req.body.bio,
//         })
//         res.status(200).json(updateUser)
        
//     })
//     .catch(err => {
//         res.status(500).json({message: err})
//     })

// })




module.exports = server; // EXPORT YOUR SERVER instead of {}
