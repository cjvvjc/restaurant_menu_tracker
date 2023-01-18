const express = require('express')
const router = express.Router()

// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', indexController.getHome)
router.post('/q', indexController.getSerach)

module.exports = router