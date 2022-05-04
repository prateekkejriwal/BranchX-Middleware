const router = require('express').Router()
const { configurationsHandler } = require('../handlers/index')

// Configuration Routes
router.get('/:appId', configurationsHandler.getConfiguration)
router.put('/:appId', configurationsHandler.updateConfiguration)
router.post('/', configurationsHandler.createConfiguration)


module.exports = router