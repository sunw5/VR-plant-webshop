const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    role: {
        type: Number,
        default: 1,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre(['save'], function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcryptjs.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcryptjs.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    })
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcryptjs.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
