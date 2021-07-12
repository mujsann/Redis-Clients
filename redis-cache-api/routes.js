

const helpers = require('./helpers')

const router = require('express').Router()
router.get('/git-repos/:username', helpers.cache, helpers.get_repos)


module.exports = router