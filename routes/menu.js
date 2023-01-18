const express = require('express')
const router = express.Router()

// const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', menuController.getIndex)
router.get('/:id', menuController.editMenu)
router.get('/delete/:id', menuController.deleteMenu)
router.post('/save', menuController.saveMenu)
router.post('/new', menuController.newMenu)

module.exports = router