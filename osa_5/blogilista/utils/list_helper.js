const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.reduce( (acc, cur) => {
        return acc + cur.likes
    }, 0)
    return likes
}

const compareLikes = (blog1, blog2) => {
    return blog1.likes > blog2.likes ? blog1 : blog2
}

const favoriteBlog = (blogs) => {
    const mostLikes = blogs.reduce(compareLikes)
    return {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    } 
}

const mostBlogs = (blogs) => {
    const authorNames = blogs.map(blog => blog.author)
    const nameSet = new Set(authorNames)
    let blogArray = []
    nameSet.forEach(name => {
        const filterAuthor = blogs.filter(blog => blog.author === name)
        const authorObj = {
            author: name,
            blogs: filterAuthor.length
        }
        blogArray.push(authorObj)
    })
    const mostBlog = blogArray.reduce((blog1, blog2) => blog1.blogs > blog2.blogs ? blog1 : blog2)
    return mostBlog
}

const mostLikes = (blogs) => {
    const authorNames = blogs.map(blog => blog.author)
    const nameSet = new Set(authorNames)
    let blogArray = []
    nameSet.forEach(name => {
        const filterAuthor = blogs.filter(blog => blog.author === name)
        const authorObj = {
            author: name,
            likes: filterAuthor.reduce((acc, cur) => acc+cur.likes,0)
        }
        blogArray.push(authorObj)
    })
    const mostLikes = blogArray.reduce((blog1, blog2) => blog1.likes > blog2.likes ? blog1 : blog2)
    return mostLikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}