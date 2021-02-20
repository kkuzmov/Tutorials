const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config')
let ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;



const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: [true, 'Username is already in use!'],
        minLength: [5, 'Username must be at least FIVE characters long!'],
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `${props.value} is invalid! Username should consist only of english letters and digits`
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at least FIVE characters long!'],
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `Password must consist only of english letters and digits`
            }
        }
    },
    enrolledCourses: []
})


userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt =>{
            return bcrypt.hash(this.password, salt);
        })
        .then(hash =>{
            this.password = hash;
            next()
        })
        .catch(err=>{
            console.log(err)
        })
    
    })

module.exports = mongoose.model('User', userSchema)