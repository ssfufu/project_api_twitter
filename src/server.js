const express = require('express')
const app = express()
const dto = require('./dto/user.dto')
const dtoTweet = require('./dto/tweets.dto')
const dtoAnswer = require('./dto/answers.dto')
const controller = require('./controllers/user.controller')
const controllerTweet = require('./controllers/tweets.controller')
const controllerAnswer = require('./controllers/answers.controller')
const isAuthenticated = require('./middlewares/auth.middleware')
require('./database')

app.use(express.json())

app.post('/create/user', dto.createUser, controller.createUser)

app.post(
    '/create/tweet',
    isAuthenticated,
    dtoTweet.createTweet,
    controllerTweet.createTweet
)

app.post(
    '/create/answer/:tweetId',
    isAuthenticated,
    dtoAnswer.createAnswer,
    controllerAnswer.createAnswer
)

app.get('/user/:user', isAuthenticated, dto.getUser, controller.getUser)

app.get(
    '/tweet/:tweetId',
    isAuthenticated,
    dtoTweet.getTweet,
    controllerTweet.getTweet
)

app.get(
    '/user/:user/tweets',
    isAuthenticated,
    dtoTweet.getUserTweets,
    controllerTweet.getUserTweets
)

app.get(
    '/user/:user/answers',
    isAuthenticated,
    dtoAnswer.getUserAnswers,
    controllerAnswer.getUserAnswers
)

app.get(
    '/tweet/:tweetId/answers',
    isAuthenticated,
    dtoAnswer.getTweetAnswers,
    controllerAnswer.getTweetAnswers
)

app.patch(
    '/edit/user',
    isAuthenticated,
    dto.patchUser,
    controller.patchUser
)

app.patch(
    '/edit/tweet/:tweetId',
    isAuthenticated,
    dtoTweet.patchTweet,
    controllerTweet.patchTweet
)

app.patch(
    '/edit/answer/:answerId',
    isAuthenticated,
    dtoAnswer.patchAnswer,
    controllerAnswer.patchAnswer
)

app.patch(
    '/create/answer/:tweetId',
    isAuthenticated,
    dtoAnswer.answerSurvey,
    controllerAnswer.answerSurvey
)

app.delete(
    '/delete/tweet/:tweetId',
    isAuthenticated,
    dtoTweet.deleteTweet,
    controllerTweet.deleteTweet
)

app.delete(
    '/delete/user',
    isAuthenticated,
    dto.deleteUser,
    controller.deleteUser
)

app.listen(3001, () => {
    console.log('Server is running on port 3001')
})
