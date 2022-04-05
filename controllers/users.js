const router = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  let where = {}
  if (req.query.status) {
    where = {
      status: req.query.status    
    }
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash', 'createdAt', 'updatedAt'] }, 
    include: {
      model: Blog, 
      as: 'readings',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt']},
      through: {
        attributes: ['id', 'status'],    
        where                            //only show reading_list where status is as in request
      }
    }
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
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