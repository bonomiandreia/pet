const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    email: { type: String, required: true, unique: true, lowcase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)