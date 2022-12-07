const Answer = require('../models/usersAnswers')
const Tweet = require('../models/tweetSchema')
const User = require('../models/userSchema')

const createAnswer = async (req, res) => {
    try {
        const tweetId = req.params.tweetId
        const { username, contentAnswer } = req.body
        const user = await User.findOne({ username: username, projection: 0 })
        const userId = user._id
        const tweet = await Tweet.findOne({ _id: tweetId, projection: 0 })
        const answer = new Answer({
            contentAnswer: contentAnswer,
            user: userId,
            username: username,
            tweet: tweetId,
        })

        tweet.answersIds.push(answer._id)
        await tweet.save()
        console.log(tweet.answersIds)
        await answer.save()
        res.status(200).json({ message: 'Answer created' })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getUserAnswers = async (req, res) => {
    try {
        const user = req.params.user
        const userFind = await User.findOne({ username: user, projection: 0 })
        const answers = await Answer.find({ user: userFind._id, projection: 0 })
        res.status(200).json(answers)
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getTweetAnswers = async (req, res) => {
    try {
        const tweetId = req.params.tweetId
        const answers = await Answer.find({ tweet: tweetId })
        res.status(200).json(answers)
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const patchAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId
        const contentAnswer = req.body.contentAnswer
        const answer = await Answer.findOne({
            _id: answerId,
        })
        answer.contentAnswer = contentAnswer
        await answer.save()
        res.status(200).json({ message: 'Answer updated' })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const answerSurvey = async (req, res) => {
    try {
        const tweetId = req.params.tweetId
        const tweetFind = await Tweet.findOne({ _id: tweetId })
        const answerSurvey = req.body.answerSurvey
        const user = await User.findOne({ username: req.body.username })
        const userId = user._id
        const answer = new Answer({
            contentAnswer: answerSurvey,
            user: userId,
            username: user.username,
            tweet: tweetFind._id,
        })
        tweetFind.sondageAnswers.push(answer.contentAnswer)
        tweetFind.answersIds.push(answer._id)
        await tweetFind.save()
        await answer.save()
        res.status(200).json({ message: 'Survey answered' })
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

module.exports = {
    createAnswer,
    getUserAnswers,
    getTweetAnswers,
    patchAnswer,
    answerSurvey,
}
