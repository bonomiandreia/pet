const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypt = require('bcryptjs')

const UserSchema = new schema({
    email: { type: String, required: true, unique: true, lowcase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
})

UserSchema.pre('save', function(next){
    let user = this;
    if (!user.isModified('password')) return next();
    crypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted;
        return next();
    })

})

module.exports = mongoose.model('User', UserSchema)