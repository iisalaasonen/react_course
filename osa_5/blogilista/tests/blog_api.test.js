const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const helper = require("./helper")
const app = require("../app")
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")

let TOKEN = ""

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

  })

describe("HTTP GET tests", () => {
    test("blogs are returned as json", async () => {
        await api
          .get("/api/blogs")
          .expect(200)
          .expect("Content-Type", /application\/json/)
      })
    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
      
      })
    test("a specific blog is within the returned blogs", async () => {
        const response = await api.get("/api/blogs")
        const titles = response.body.map(r => r.title)
        expect(titles).toContain("React patterns")
    
    test("identified field is id not default _id", async () => {
        const response = await api.get("/api/blogs")
        const blogs = response.body
        expect(blogs[0].id).toBeDefined()
    })

    })
})

describe.only("POST method tests", () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ 
      username: "root",
      name: "super",
      passwordHash,
      blogs: [] })

    await user.save()

    const logIn = {
      username: "root",
      password: "sekret"
    }

    const logCred = await api
      .post("/api/login")
      .send(logIn)
      .expect(200)

    TOKEN = logCred.body.token

  })
    test("user can add a new blog when logged in", async () => {

        const blog = {
          title: "Testing and testing",
          author: "Supertest",
          url: "https://tests.com/",
          likes: 22,
        }
        await api
          .post("/api/blogs")
          .send(blog)
          .set("authorization", `bearer ${TOKEN}`)
          .expect(200)
          .expect("Content-Type", /application\/json/)
      
        const response = await api
          .get("/api/blogs")
          .set("authorization", `bearer ${TOKEN}`)
        const blogsEnd = response.body
        expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsEnd.map(blog => blog.title)
        expect(titles).toContain("Testing and testing")
          
      })
      test("likes gets a value 0 if no value is passed", async () => {
          const blog = {
              title: "React patterns 2",
              author: "Michael Chan",
              url: "https://reactpatterns.com/",
            }
            const addedBlog = await api
              .post("/api/blogs")
              .send(blog)
              .set("authorization", `bearer ${TOKEN}`)
              .expect(200)
              .expect("Content-Type", /application\/json/)
            expect(addedBlog.body.likes).toBe(0)
      })
      test("return 400 Bad request when title and url are missing", async () => {
        const blog = {
            author: "Michael Chan",
            likes: 13
          }
        await api
          .post("/api/blogs")
          .send(blog)
          .set("authorization", `bearer ${TOKEN}`)
          .expect(400)
        
      })
      test("Can't add a blog without right token", async () => {
        const blog = {
          title: "Testing",
          author: "Supertest",
          url: "https://tests.com/",
          likes: 26,
        }
        await api
          .post("/api/blogs")
          .send(blog)
          .expect(401)
          .expect("Content-Type", /application\/json/)
      })
})

test("delete a blog", async () => {
  const blogs = await api.get("/api/blogs")
  const id = blogs.body[0].id
  console.log(id)

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const blogsEnd = await api.get("/api/blogs")
  expect(blogsEnd.body).toHaveLength(helper.initialBlogs.length - 1)

})
test("update a blog", async () => {
  const body = helper.initialBlogs[0]
  const replace = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 30
  }

  const updatedBlog = await api
    .put(`/api/blogs/${body._id}`)
    .send(replace)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(updatedBlog.likes).toBe(30)  
})

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("`username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test("creation fails with proper statuscode and message if password is invalid", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "sa",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    expect(result.body.error).toContain("Password can't be empty and must contain atleast 3 character")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})