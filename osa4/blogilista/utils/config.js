/* eslint-disable no-undef */
require('dotenv').config()

let PORT = process.env.PORT
let mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.mongoUrl

module.exports = {
  mongoUrl,
  PORT
}