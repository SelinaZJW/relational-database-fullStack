// require('dotenv').config()
// const { Sequelize, QueryTypes } = require('sequelize')
// const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
require('express-async-errors')
// var cors = require('cors')
// app.use(cors())
const app = express()

const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   },
// })

// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//     const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
//     const blogsArranged = blogs.map(b => `${b.author}: '${b.title}', ${b.likes} likes` )
//     console.log(blogsArranged)
//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()

// class Blog extends Model {}
// Blog.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   author: {
//     type: DataTypes.TEXT
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   title: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//     default: 0
//   }
// }, {
//   sequelize,
//   underscored: true,
//   timestamps: false,
//   modelName: 'blog'
// })

// app.get('/api/blogs', async (req, res) => {
//   // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
//   const blogs = await Blog.findAll()
//   res.json(blogs)
// })

// app.post('/api/blogs', async (req, res) => {
//   console.log(req.body)
//   try {
//     const blog = await Blog.create(req.body)
//     return res.json(blog)
//   } catch(error) {
//     return res.status(400).json({ error })
//   }
// })

// app.get('/api/blogs/:id', async (req, res) => {
//   const blog = await Blog.findByPk(req.params.id)
//   if (blog) {
//     console.log(blog.toJSON())
//     res.json(blog)
//   } else {
//     res.status(404).end()
//   }
// })

// app.delete('/api/blogs/:id', async (req, res) => {
//   await Blog.destroy({ where: {id: req.params.id} })
//   const blogs = await Blog.findAll()
//   res.json(blogs)
// })

// const PORT = process.env.PORT || 3001

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })