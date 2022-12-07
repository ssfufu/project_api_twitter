const User = require('../models/userSchema')
const isAuthenticated = async (req, res, next) => {
    try {
        const user = req.body.username
        const password = req.body.password
        const userFind = await User.findOne({ username: user })
        if (!userFind) {
            res.status(404).send('User not found')
            return
        }
        if (!password || password === undefined) {
            res.status(401).send('Password is required')
            return
        }
        if (userFind.password !== password) {
            res.status(401).send('Unauthorized')
            return
        }
        next()
    } catch (err) {
        res.status(500).send('AUTH ERROR')
    }
}

module.exports = isAuthenticated
