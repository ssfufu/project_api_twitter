const Tweet = require('../models/tweetSchema')
const User = require('../models/userSchema')

const createTweet = async (req, res, next) => {
    try {
        const content = req.body.content
        const user = req.body.username
        const isSondage = req.body.isSondage
        const contentSondage = req.body.contentSondage

        if (content === undefined) {
            res.status(400).json({ message: 'Content is required' })
            return
        }
        if (content.length > 280) {
            res.status(400).json({ message: 'Content too long' })
            return
        }
        if (user === undefined) {
            res.status(400).json({ message: 'User is required' })
            return
        }
        if (isSondage === true) {
            if (contentSondage.length < 2) {
                res.status(400).json({ message: 'Content sondage too short' })
                return
            }
        }

        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getTweet = async (req, res, next) => {
    try {
        const id = req.params.tweetId
        const tweetFind = await Tweet.findOne({
            _id: id,
        })
        if (!tweetFind) {
            res.status(404).json({ message: 'Tweet not found' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getUserTweets = async (req, res, next) => {
    try {
        const user = req.params.user
        const userFind = await User.findOne({
            username: user,
        })
        if (!userFind) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const patchTweet = async (req, res, next) => {
    try {
        const id = req.params.tweetId
        const data = req.body.content
        const tweetFind = await Tweet.findOne({
            _id: id,
        })
        if (tweetFind.username !== req.body.username) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        tweetFind.content = data
        if (data === undefined) {
            res.status(400).json({ message: 'Content is required' })
            return
        }
        if (data.length > 280) {
            res.status(400).json({ message: 'Content too long' })
            return
        }
        if (data.length === 0 || data === '' || data.length < 1) {
            res.status(400).json({ message: 'Content is required' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const deleteTweet = async (req, res, next) => {
    try {
        const id = req.params.tweetId
        const user = req.body.username
        const tweetFind = await Tweet.findOne({
            _id: id,
        })
        if (!tweetFind) {
            res.status(404).json({ message: 'Tweet not found' })
            return
        }
        if (tweetFind.username !== user) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

module.exports = {
    createTweet,
    getTweet,
    patchTweet,
    deleteTweet,
    getUserTweets,
}
