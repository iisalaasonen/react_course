import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import ErrorNotification from "./components/ErrorNotification"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Togglable from "./components/Togglable"

const App = () => {
  const appStyle = {
    margin: "0",
    padding: "5px",
    background: "#cccccc"
  }
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  blogs.sort((blog1, blog2) => {
    return blog1.likes - blog2.likes

  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if( loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        "loggedUser", JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("wrong username or password")
      setTimeout(() => setErrorMessage(null), 4000)
    }

  }

  const logOut = (event) => {
    console.log(event)
    window.localStorage.removeItem("loggedUser")
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(addedBlog))
      setMessage(`a new blog ${addedBlog.title} by ${user.name} added`)
      setTimeout(() => setMessage(null), 4000)
    } catch (exception) {
      console.log(exception)
    }
  }

  const updateBlog = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      setMessage(`you liked ${updatedBlog.title}`)
      setTimeout(() => setMessage(null), 4000)

    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.deleteOne(blog.id)
      const updatedBlogs = blogs.filter(b => b.id !== blog.id )
      setBlogs(updatedBlogs)
      setMessage(`You deleted blog ${blog.title}`)
      setTimeout(() => setMessage(null), 4000 )
    } catch (exception){
      console.log(exception)
    }
  }

  if (user === null ) {
    return (
      <div style={appStyle}>
        <ErrorNotification errorMessage={errorMessage}/>
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div style={appStyle}>
      <h2>blogs</h2>
      <Notification message={message}/>
      <p>{user.name} logged in</p>
      <button onClick={logOut}>logout</button>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user} />
      )}
    </div>
  )
}

export default App