const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    // if user gets deleted, his videos also get deleted.
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema);

module.exports = User;