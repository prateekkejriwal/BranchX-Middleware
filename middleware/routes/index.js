const router = require('express').Router()

// Index Route
router.use("/configurations", require('./configurations'))

router.get('/hello',(req,res)=>{

res.send("ok")})
router.use(require('../handlers/error').errorHandler)
module.exports = router