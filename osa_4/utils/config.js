require("dotenv").config()

let PORT = process.env.PORT

const MONGO_URI = process.env.NODE_ENV === "test" ? process.env.MONGO_TEST : process.env.MONGO_URI

module.exports = {
    MONGO_URI, 
    PORT
}