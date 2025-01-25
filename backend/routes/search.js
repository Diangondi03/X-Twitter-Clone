const express = require('express');
const router = express.Router()

const { getTop,getLatest,getPeople,getMedia }= require('../controllers/SearchController')

router.get('/top',getTop)

router.get('/latest',getLatest)

router.get('/people',getPeople)

router.get('/media',getMedia)

module.exports = router