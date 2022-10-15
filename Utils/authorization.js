module.exports = (...roles) => {
    return(req, res, next) => {
        const user = req.user
        if (!roles.includes(user.role)) {
            return res.json({
                status: 'fail',
                error: 'Unauthorize for access this url'
            })
        }
        next()
    }
}