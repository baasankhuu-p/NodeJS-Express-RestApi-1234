const ErrorHandler = (err, req, res, next) => {
    console.log(err.stack.cyan.undeline);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
    })
    next();
}
module.exports = ErrorHandler