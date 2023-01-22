const ErrorHandler = (err, req, res, next) => {
    if(err.name=='JsonWebTokenError' || err.message=='invalid token'){
        err.message='Таны токен буруу байна'
    }
    res.status(err.statusCode || 500).json({
        success: false,
        name:err.name,
        error: err.message
    })
    next();
}
module.exports = ErrorHandler