//verify if the input is completed
const User = require('../models/userSchema')
const createUser = async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (username.length === 0 || username === undefined) {
            res.status(400).json({ message: 'Username is required' })
            return
        }

        const userExists = await User.exists({ username })

        if (userExists) {
            res.status(400).json({ message: 'User already exists' })
            return
        }
        if (username.length > 20) {
            res.status(400).json({ message: 'Username too long' })
            return
        }
        if (!username.match(/^[a-zA-Z]+$/)) {
            res.status(400).json({ message: 'Invalid username' })
            return
        }
        if (password.length === 0 || password === undefined) {
            res.status(400).json({ message: 'Password is required' })
            return
        }
        if (password.length > 32) {
            res.status(400).json({ message: 'Password too long' })
            return
        }
        if (password.length < 8) {
            res.status(400).json({ message: 'Password too short' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error dto')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = req.params.user
        if (!user || user === null) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        const userFind = await User.findOne(
            { username: user },
            { _id: 0, user: 1 }
        )
        if (!userFind) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        if (!user?.length) {
            res.status(400).json({ message: 'Invalid username' })
            return
        }

        next()
    } catch (err) {
        console.log(err, 'error dto')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const patchUser = async (req, res, next) => {
    try {
        const user = req.body.username
        const data = req.body.newUsername
        const userFind = await User.findOne({
            username: user,
        })
        if (userFind.username !== req.body.username) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        if (!userFind) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        if (!data?.length) {
            res.status(400).json({ message: 'Invalid username' })
            return
        }
        if (data.length > 20) {
            res.status(400).json({ message: 'Username too long' })
            return
        }
        if (!data.match(/^[a-zA-Z]+$/)) {
            res.status(400).json({ message: 'Invalid username' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error dto')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = req.body.username
        const userFind = await User.findOne({
            username: user,
        })
        if (userFind.username !== req.body.username) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        if (!userFind) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error dto')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

module.exports = { createUser, getUser, patchUser, deleteUser }
