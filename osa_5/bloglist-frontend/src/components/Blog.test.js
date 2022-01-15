import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"

test("renders only title by default", () => {
  const blog = {
    title: "Testing",
    author: "tester",
    url: "testyourstuff.com",
    likes: 12,

  }
  const component = render(
    <Blog blog={blog}></Blog>
  )

  const div = component.container.querySelector(".allContent")

  expect(component.container).toHaveTextContent("Testing")
  expect(div).toHaveStyle("display:none")
})

test("renders also author, likes and url when button is clicked", () => {
  const blog = {
    title: "Testing",
    author: "tester",
    url: "testyourstuff.com",
    likes: 12,
  }

  const component = render(
    <Blog blog={blog}></Blog>
  )

  const button = component.getByText("view")
  fireEvent.click(button)

  const div = component.container.querySelector(".allContent")
  expect(div).not.toHaveStyle("display: none")
})
/*
test("clicking button twice call event handler twice", () => {
  const blog = {
    title: "Testing",
    author: "tester",
    url: "testyourstuff.com",
    likes: 12,
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={mockHandler}></Blog>
  )

  component.debug()
  const button = component.getByText("like")
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
*/
