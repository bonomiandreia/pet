const mongoose = require('mongoose');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new PostSchema({
    date: {type: String, required: true, lowcase: true },
    text: {type: String, required: true, lowcase: true }
})

module.exports = mongoose.model('Post', PostSchema)