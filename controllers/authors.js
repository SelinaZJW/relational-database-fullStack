const router = require('express').Router()
const Blog  = require('../models/blog')
const sequelize = require('sequelize')

router.get('/', async (req, res) => {

  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      [sequelize.fn('COUNT',  sequelize.col('id')), 'articles'],

  ]
    // attributes: {
    //   include: [
    //     [sequelize.fn('COUNT', sequelize.col('likes')), 'likes']
    //   ]
    // },
    // order: [
    //   ['likes', 'DESC']
    // ],

  })

  res.json(authors)
})

module.exports = router