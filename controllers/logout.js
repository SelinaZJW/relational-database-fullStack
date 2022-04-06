const router = require('express').Router()

const { SessionToken } = require('../models')

router.delete('/', async (req, res) => {
  const authorization = req.get('authorization')
  console.log(authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    console.log(token)
    await SessionToken.destroy({
      where: { token: token }
    })
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

module.exports = router