
// error middleware
async function handleError(err, req, res, next) {
    res.status(500).json({ status: 'error', message: err.message,stack:err.stack })
}

module.exports.errorHandler = handleError