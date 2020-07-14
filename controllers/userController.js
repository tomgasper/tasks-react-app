const hashPassword = require('../handlers/hashPassword')
const bcrypt = require('bcrypt')
const Models = require('../models/Models')
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
    createNew: async(req,res) => {
        const { username,password, email } = req.body

        if ( !username || !password || !email ) res.status(400).json('You must fill all input fields')

        try {
            const hashedPassword = await hashPassword(password)
            const newUser = new Models.Users({
                name: username,
                password: hashedPassword,
                email: email
            })

            newUser.save( (err) => {
                if (err) res.status(400).json('Server error, please try again')
                res.json(username)
            })
        }
        catch (err) {
            res.status(400).json(err)
            console.log(err)
        }
    },
    logIn: (req,res) => {
        const { username, password } = req.body

        if (!username || !password ) { // error msg if 1 or more input fields empty
            res.header(400).json("Please fill in both fields")
        }

        Models.Users.findOne({ name: username }, (err,result) => {
            if (err) res.status(400).json("Server error, please try again")
            if (!result) res.status(400).json("Account like this doesn't exist")
            else {
                const hash = result.password

                bcrypt.compare( password,hash, (err, resultTrue) => {
                    if (err) res.status(400).json('Server error, please try again')

                    if (resultTrue) { // CREATE NEW TOKEN IF PASSWORD CORRECT
                        const token = jwt.sign({
                            user: username
                        }, config.SECRET, { expiresIn: '1h' })
                        res.header(200).cookie('token', token, { httpOnly: true }) // SEND AUTH COOKIE TO CLIENT
                        .json(username) // SEND USERNAME STRING TO CLIENT(TO DISPLAY)

                        console.log('Created new cookie')
                    }
                    else {
                        res.status(400).json('Incorrect password, please try again')
                    }
                })
            }
        })
    },
    logOut: (req,res) => {
        res.header(200).cookie('token', '', {expires: new Date() }).json('User logged out')
        console.log('Deleted cookie, user logged out')
    },
    getUser: (req,res) => {
        const user = res.locals.user // PASS VARIABLE USING MIDDLEWARE
        res.json(user)
    }
}