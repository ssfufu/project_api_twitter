const Tweet = require('../models/tweetSchema')
const User = require('../models/userSchema')
const Answer = require('../models/usersAnswers')

const createAnswer = async (req, res, next) => {
    try {
        const { username, contentAnswer } = req.body
        const user = await User.findOne({ username: username })
        const userId = user._id
        const tweetId = req.params.tweetId
        const tweet = await Tweet.exists({ _id: tweetId })
        if (!tweet) {
            res.status(404).json({ message: 'Tweet not found' })
            return
        }
        if (contentAnswer === undefined) {
            res.status(400).json({ message: 'Veuillez remplir le champ' })
            return
        }
        if (contentAnswer.length > 280) {
            res.status(400).json({ message: 'Votre réponse est trop longue' })
            return
        }
        if (tweetId === undefined) {
            res.status(400).json({ message: 'Veuillez remplir le champ' })
            return
        }
        if (userId === undefined) {
            res.status(400).json({ message: 'Veuillez vous connecter' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const getUserAnswers = async (req, res, next) => {
    try {
        const user = req.params.user
        const userFind = await User.findOne({ username: user, projection: 0 })
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

const getTweetAnswers = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId
        const tweet = await Tweet.exists({
            _id: tweetId,
        })
        if (!tweet) {
            res.status(404).json({ message: 'Tweet not found' })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const patchAnswer = async (req, res, next) => {
    try {
        const answerId = req.params.answerId
        const contentAnswer = req.body.contentAnswer
        const answer = await Answer.findOne({
            _id: answerId,
        })
        if (answer === null || answer === undefined) {
            res.status(404).json({ message: 'Answer not found' })
            return
        }
        if (answer.username !== req.body.username) {
            res.status(401).json({ message: 'Unauthorized' })
            return
        }
        if (contentAnswer === undefined) {
            res.status(400).json({ message: 'Veuillez remplir le champ' })
            return
        }
        if (contentAnswer.length > 280) {
            res.status(400).json({ message: 'Votre réponse est trop longue' })
            return
        }
        if (contentAnswer === answer.contentAnswer) {
            res.status(400).json({ message: "Réponse identique à l'originale" })
            return
        }
        const tweetFind = await Tweet.findOne({
            _id: answer.tweet,
        })
        if(tweetFind.isSondage === true) {
            res.status(400).json({ message: "Vous ne pouvez pas modifier une réponse à un sondage" })
            return
        }
        next()
    } catch (err) {
        console.log(err, 'error controller')
        res.status(500).json({ message: 'Une erreur est survenue' })
    }
}

const answerSurvey = async (req, res, next) => {
    try {
        const tweetFind = await Tweet.findOne({ _id: req.params.tweetId })
        const answerSurvey = req.body.answerSurvey
        if (tweetFind === null || tweetFind === undefined) {
            res.status(404).json({ message: 'Tweet not found' })
            return
        }
        if (tweetFind.isSondage !== true) {
            res.status(400).json({ message: "Ce tweet n'est pas un sondage" })
            return
        }
        if (answerSurvey === undefined) {
            res.status(400).json({ message: 'Veuillez remplir le champ' })
            return
        }
        if (!tweetFind.contentSondage.includes(answerSurvey)) {
            res.status(400).json({
                message: 'Veuillez choisir une option valide',
            })
            return
        }
        next()
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
