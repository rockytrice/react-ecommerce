const mongoose = require("mongoose");
const Schema = mongoose.Schema
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        requried: true,
        trim: true,
        unique: true
    },

    //saving a hashed version of password
    hashed_password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true,

    },
    //long unique string that will be used to generate the hash password
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    //when user purchases items from online shop the items purchased will be stored in the history. so any time the user logs in, they will be able to see what was purchased.
    history: {
        type: Array,
        default: []
    },

}, {
    timestamps: true
});

userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac("sha1", this.salt)
                .update(password)
                .digest("hex");

        } catch (err) {
            return "";
        }
    }
}

// const User = mongoose.model("users", UserSchema);

// UserSchema.set("autoIndex", false);

module.exports = mongoose.model("User", userSchema)