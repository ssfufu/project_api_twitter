const mongoose = require('mongoose')
const { connect, set } = mongoose

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!')
})

mongoose.connection.on('reconnected', () => {
    console.log('Mongoose is reconnected!!!')
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected!!!')
})

mongoose.connection.on('close', () => {
    console.log('Mongoose connection is closed!!!')
})

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection error: ', error)
})

set('debug', true)