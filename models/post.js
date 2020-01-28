const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    date: {type: String, required: true, lowcase: true },
    text: {type: String, required: true, lowcase: true },
    idUser: { type: String, required: true }
})

module.exports = mongoose.model('Post', PostSchema)