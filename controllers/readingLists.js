const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { ReadingList, SessionToken } = require('../models')
const { SECRET } = require('../utils/config')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  const token = authorization.substring(7)
  const tokenExist = await SessionToken.findOne({ where: { token: token }})
  console.log(tokenExist)

  if (!tokenExist) {
    res.status(401).json({ error: 'session timed out' })
  } 
  if (authorization && authorization.toLowerCase().startsWith('bearer ') && tokenExist) {
    try {
      req.decodedToken = jwt.verify(token, SECRET)
      console.log(req.decodedToken)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }

  next();
}

router.get('/', async (req, res) => {
  const readingLists = await ReadingList.findAll()
  res.json(readingLists)
})

router.post('/', async (req, res) => {
  try {
    const body = req.body
    
    await ReadingList.create(body)
    res.json(body)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readingList = await ReadingList.findByPk(req.params.id)
  console.log(readingList)

  if (readingList && readingList.userId === req.decodedToken.id) {
    readingList.status = req.body.status
    await readingList.save()
    res.json(readingList)
  } else {
    res.status(404).end()
  }
})

module.exports = router
