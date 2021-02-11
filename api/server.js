// BUILD YOUR SERVER HERE
const express = require("express")
const db = require("./users/model")

const server = express()

server.use(express.json())


server.get("/users/", (req, res) => {
    db.find()
    .then(users => {
    return res.status(200).json(users);
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ 
            message: "The users information could not be retrieved" 
        });
    });
})

server.get("/users/:id", async (req, res) => {
    try{
    const user = await db.findById(req.params.id)

    if (user) {
        return res.status(200).json(user)
    } else{
        return res.status(404).json({
            message: "The user information could not be retrieved"
        })
    }
}
catch(err) {
    console.log(err)
    res.status(500).json({ message: "The user information could not be retrieved" })
}
})

// server.post("/users", async (req, res) => {
//     try{
//     const newUser = {
//         name: req.body.name,
//         bio: req.body.bio
//     }

//     if (!newUser.name || !newUser.bio) {

//         return res.status(400).json({ 
//             message: "Please provide name and bio for the user" 
//         })
        
//     } await db.insert(newUser)
    
//     return res.status(201).json(newUser)
    
//     }
//     catch(err) {
//         console.log(err)
//         res.status(500).json({ message: "There was an error while saving the user to the database" })

//     }
// })

server.delete("/users/:id", async (req, res) => {
    try{
    const user = await db.findById(req.params.id)

    if (user) {
        db.remove(user.id)
        return res.status(204).json(user)
    } else {
        return res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }
}
catch(err){
    console.log(err)
        res.status(500).json({ message: "The user could not be removed" })
}
})
server.post("/users", async (req, res) => {
    try{
    const newUser = {
        name: req.body.name,
        bio: req.body.bio
    }

    if (!newUser.name || !newUser.bio) {

        return res.status(400).json({ 
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

server.put("/users/:id", async (req, res) => {
    try{
    const user = await db.findById(req.params.id)

    if (!user.name || !user.bio) {

       return res.status(400).json({ 
            message: "Please provide name and bio for the user" 
        })
    }
    if (user) {
        const updateUser = db.update(user.id, {
            name: req.body.name,
            bio:  req.body.bio,
        })
        return res.status(200).json(updateUser)
        
    } else{
        return res.status(404).json({
            message: "The user with the specified ID does not exist"
        })
    }}
    catch(err){
        console.log(err)
        res.status(500).json({ message: "The user information could not be modified" })
    }

})




module.exports = server; // EXPORT YOUR SERVER instead of {}
