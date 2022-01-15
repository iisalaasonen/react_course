import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import BlogForm from "./BlogForm"

test("<BlogForm /> submits new blog with correct information", () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector("#title")
  const author = component.container.querySelector("#author")
  const url = component.container.querySelector("#url")

  const form = component.container.querySelector("form")

  fireEvent.change(title, {
    target: { value: "testing forms" }
  })
  fireEvent.change(author, {
    target: { value: "testerpro" }
  })
  fireEvent.change(url, {
    target: { value: "test.com" }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("testing forms" )
  expect(createBlog.mock.calls[0][0].author).toBe("testerpro" )
  expect(createBlog.mock.calls[0][0].url).toBe("test.com" )

})