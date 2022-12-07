const { model, Schema } = require('mongoose')

const schema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    username: String,
    isSondage: Boolean,
    contentSondage: [String],
    answersIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'usersAnswers',
        },
    ],
    sondageAnswers: [String],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model('Tweets', schema, 'tweet')
