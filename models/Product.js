const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title should be at least 4 characters long']
    },
    description: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: [20, 'Description should be at least 20 characters long']
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?/, 'Bad image URL'],
    },
    duration: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true,
    },
    creator: {
        type: String
    },
    usersEnrolled: [],
})


module.exports = mongoose.model('Product', productSchema);