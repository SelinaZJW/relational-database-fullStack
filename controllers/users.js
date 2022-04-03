const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = {username: body.username, name: body.name, passwordHash: passwordHash}
    
    await User.create(user)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username }})
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router