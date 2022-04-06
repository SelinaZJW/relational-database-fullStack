const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const SessionToken = require('./sessionToken')

User.hasMany(Blog)
Blog.belongsTo(User)
// Blog.sync({ alter: true })
// User.sync({ alter: true })

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readinglists' })

module.exports = {
  Blog, User, ReadingList, SessionToken
}