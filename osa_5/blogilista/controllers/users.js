const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async ( request, response) => {
    const users = await User.find({}).populate("blogs", {url:1, title:1, author:1 })
    response.json(users.map(u => u.toJSON()))

})

usersRouter.get("/:id", async (request, response) => {
    const id = request.params.id
    const user = await User.findById(id)
    if (user) {
        response.json(user.toJSON())
    } else {
        response.status(404).end()
    }
})

usersRouter.post("/", async ( request, response) => {
    const body = request.body
    if (body.password.length < 3 || body.password===undefined) {
        response.status(400).json({ error: "Password can't be empty and must contain atleast 3 character" })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter