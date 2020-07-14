const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = async function(password) {
    const hashPassword = await new Promise( (resolve,reject) => {
        bcrypt.hash( password, saltRounds, (err,hash) => {
            if (err) throw err
            else resolve(hash)
        })
    })
    return hashPassword
}