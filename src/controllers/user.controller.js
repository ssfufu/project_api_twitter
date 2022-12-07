const User = require('../models/userSchema')
const Tweet = require('../models/tweetSchema')
const Answer = require('../models/usersAnswers')
const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const newUser = new User()

        newUser.username = username
        newUser.password = password

        await newUser.save()
        res.status(201).json({ message: 'User created' })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getUser = async (req, res) => {
    try {
        const user = req.params.user
        const userFind = await User.findOne({ username: user })
        res.status(200).json({
            username: userFind.username,
        })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const patchUser = async (req, res) => {
    try {
        const user = req.body.username
        const data = req.body.newUsername
        const userFind = await User.findOne({
            username: user,
        })
        userFind.username = data
        await userFind.save()

        res.status(200).json({
            username: userFind.username,
            message: 'User updated',
        })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = req.body.username
        const userFind = await User.findOne({
            username: user,
        })
        await Tweet.deleteMany({ username: user })
        await Answer.deleteMany({ username: user })
        await userFind.remove()
        res.status(200).json({
            message: 'User deleted',
        })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

module.exports = { createUser, getUser, patchUser, deleteUser }
