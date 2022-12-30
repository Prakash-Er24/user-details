const jwt = require('jsonwebtoken')

const authentication = (req,res,next) => {
    const token = req.headers.authorization
    if(token)
    {
        const tokenData = jwt.verify(token.split(' ')[1],process.env.JWT_KEY)
        req.tokenData = tokenData
        next()
    }
    else
    {
        res.json({notice:'Token is required'})
    }
}

const authorization =(req,res,next) => {
    const {role} = req.tokenData
    if(role==='admin')
    {
        next()
    }
    else
    {
        res.json({notice:'Access denied'})
    }
}

module.exports = {authentication, authorization}