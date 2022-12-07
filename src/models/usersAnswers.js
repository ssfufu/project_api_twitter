const { model, Schema } = require('mongoose')

const schema = new Schema({
    contentAnswer: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    username: String,
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweets',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('usersAnswers', schema, 'usersAnswers')
