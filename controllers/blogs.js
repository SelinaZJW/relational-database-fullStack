const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { SECRET } = require('../utils/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }

  next();
}


router.get('/', async (req, res) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id })

    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  console.log(req.blog.toJSON())
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  // const blog = await Blog.findByPk(req.params.id)
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  // await Blog.destroy({ where: {id: req.params.id} })

  if (req.blog && req.blog.userId === req.decodedToken.id) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
  
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router