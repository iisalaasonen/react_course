const totalLikes = require("../utils/list_helper").totalLikes
const favoriteBlog = require("../utils/list_helper").favoriteBlog
const mostBlogs = require("../utils/list_helper").mostBlogs
const mostLikes = require("../utils/list_helper").mostLikes
const helper = require("./helper")

const blogs = helper.initialBlogs

describe("total likes", () => {
    test("Empty list is zero", () => {
        const result = totalLikes([])
        expect(result).toBe(0)
    })
    test("When there is one blog likes equals to likes of that blog", () => {
        const result = totalLikes([blogs[0]])
        expect(result).toBe(7)
    })
    test("Likes of two blogs", () => {
        const twoBlogs = [blogs[0], blogs[1]]
        const result = totalLikes(twoBlogs)
        expect(result).toBe(12)
    })
    test("Bigger lists are calculated right", () => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })
    test("Blog with zero likes is zero", () => {
        const result = totalLikes([blogs[4]])
        expect(result).toBe(0)
    })
})

describe("favorite blog", () => {
    test("favorite blog with most likes", () => {
        const result = favoriteBlog(blogs)
        const exp = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        expect(result).toEqual(exp)
    })
    test("favorite blog of two", () => {
        const result = favoriteBlog([blogs[0], blogs[1]])
        const exp = {
            title: "React patterns",
            author: "Michael Chan",
            likes: 7,
        }
        expect(result).toEqual(exp)
    })
})

describe.only("Author statistics", () => {
    test("Author with most blogs", () => {
        const result = mostBlogs(blogs)
        const exp = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(result).toEqual(exp)
    })
    test("Author with most likes", () => {
        const result = mostLikes(blogs)
        const exp = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        expect(result).toEqual(exp)
    })
})