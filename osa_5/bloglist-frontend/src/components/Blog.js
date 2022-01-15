import React, { useState } from "react"

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showContent, setShowContent] = useState(false)

  const blogNameStyle = {
    border: "none",
    cursor: "pointer"

  }

  const blogStyle = {
    border: "solid black 1px",
    padding: "10px",
  }

  const contentStyle = {
    display: showContent ? "block" : "none"
  }

  const increaseLikes = (event) => {
    console.log(event)
    const blogObject = {
      user: blog.user,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }
    updateBlog(blog.id, blogObject)

  }

  const removeBlog = (event) => {
    console.log(event)
    const answer = window.confirm(`Remove blog ${blog.title}`)
    if (answer) {
      deleteBlog(blog)
    } else {
      console.log("blog delete cancelled")
    }
  }

  const removeButton = () => {
    if (blog.user) {
      if (user.username === blog.user.username) {
        return (
          <button onClick={removeBlog}>remove</button>
        )
      }
    }

  }

  return (
    <div id="blogView" style={blogStyle}>
      <div>
        <button className="blogNameButton" onClick={() => setShowContent(!showContent)} style={blogNameStyle}>{blog.title} </button>
        <button onClick={() => setShowContent(!showContent)}>
          {showContent ? "hide" : "view"}
        </button>
      </div>
      <div style={contentStyle} className="allContent">
        <p>Url: {blog.url}</p>
        <p>Likes:  {blog.likes} <button onClick={increaseLikes}>like</button></p>
        <p>Author: {blog.author}</p>
        <p>{blog.user ? blog.user.name : "unknown"}</p>
        {removeButton()}
      </div>

    </div>
  )
}

export default Blog