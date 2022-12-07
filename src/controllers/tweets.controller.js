const Tweet = require('../models/tweetSchema')
const User = require('../models/userSchema')

const createTweet = async (req, res) => {
    try {
        const content = req.body.content
        let userId = req.body.username
        const isSondage = req.body.isSondage
        const userFind = await User.findOne({ username: userId })
        const contentSondage = req.body.contentSondage

        userId = userFind._id
        const username = userFind.username

        const tweet = new Tweet({
            content: content,
            user: userId,
            username: username,
            isSondage,
            contentSondage,
        })
        await tweet.save()
        res.status(200).json({ message: 'Tweet created' })
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
        if(tweetFind.isSondage === false) {
            res.status(200).json({
                content: tweetFind.content,
                user: tweetFind.user,
                isSondage: tweetFind.isSondage,
            })
        } else {
            res.status(200).json({
                content: tweetFind.content,
                user: tweetFind.user,
                isSondage: tweetFind.isSondage,
                contentSondage: tweetFind.contentSondage,
            })
        }
            
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
        const tweets = await Tweet.find({
            user: userFind._id,
        })
        res.status(200).json(tweets)
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
        tweetFind.content = data
        await tweetFind.save()

        res.status(200).json({ content: tweetFind.content })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const deleteTweet = async (req, res) => {
    try {
        const id = req.params.tweetId
        const tweetFind = await Tweet.findOne({
            _id: id,
        })
        await tweetFind.delete()
        res.status(200).json({ message: 'Tweet deleted' })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

module.exports = {
    createTweet,
    getTweet,
    getUserTweets,
    patchTweet,
    deleteTweet,
}
