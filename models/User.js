const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
.then(() => console.log('success'))
.catch(err => console.log(err))

module.exports = User = mongoose.model('users', UserSchema)