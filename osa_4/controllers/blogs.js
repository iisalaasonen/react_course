const jwt = require("jsonwebtoken")
const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username:1, name:1 })
  response.json(blogs.map(blog => blog.toJSON()))
  })

blogRouter.post("/", async (request, response) => {
    const body = request.body
    const user = request.user
    if (!request.token || !user.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
  
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
  })

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id
  const token = request.token
  const user = request.user
  if (!token || !user.id) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
  const blog = await Blog.findById(id)
  if (!blog) response.status(400).json({ error: "Blog not found" })
  const blogId = blog.user.toString()
  if (blogId === user.id.toString()) {
    await blog.remove()
    user.blogs = user.blogs.filter(b => b._id !== blogId)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).json({ error: "User has no authorization to delete this blog" })
  }
  
})

blogRouter.put("/:id", async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogRouter
