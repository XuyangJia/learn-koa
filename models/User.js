const mongoose = require('mongoose'),
    mongoURI = require('../config/keys').mongoURI,
    Schema = mongoose.Schema

// 实例化数据模板
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
})

mongoose.connect(mongoURI, {
        useNewUrlParser: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err))

module.exports = User = mongoose.model('users', UserSchema)