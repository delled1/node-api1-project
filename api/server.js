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

server.post("/users", async (req, res) => {
    try{
    const newUser = {
        name: req.body.name,
        bio: req.body.bio
    }

    

    if (!newUser.name || !newUser.bio) {

        res.status(400).json({ 
            message: "Please provide name and bio for the user" 
        })
        
    } await db.insert(newUser)
    
    return res.status(201).json(newUser)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the user to the database" })

    }

    
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

server.put("/users/:id", async (req, res) => {
    const user = await db.findById(req.params.id)

    if (user) {
        const updateUser = db.update(user.id, {
            name: req.body.name,
            bio:  req.body.bio,
        })
        res.json(updateUser)
    } else{
        res.status(404).json({
            message: "User Not Found"
        })
    }

})




module.exports = server; // EXPORT YOUR SERVER instead of {}
