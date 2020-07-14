 const jwt = require('jsonwebtoken')
 const config = require('../config')

 const checkAuth = (req,res,next) => {
     //CHECK IF INCOMING CONNECTION HAS TOKEN
     //CHECK IF TOKEN IS VALID
     //READ TOKEN AND RETURN USERNAME
     const token = req.cookies['token']

     if (!token) {
         return res.status(400).json('Unauthorized')
     }

     jwt.verify(token,config.SECRET, (err,decoded) => {
         if (err) {
             console.log('JWT ERROR' + err)
             res.status(400).json('Unauthorized')
         }
         else {
             res.locals.user = decoded.user
             next()
         }
     })
 }

 module.exports = checkAuth