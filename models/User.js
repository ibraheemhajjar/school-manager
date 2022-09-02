const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            // required: true,
            maxlength: 100,
        },
        firstName: {
            type: String,
            // required: true,
            maxlength: 50,
        },
        lastName: {
            type: String,
            // required: true,
            maxlength: 50,
        },
        address: {
            type: String,
            // required: true
        },
        phoneNumber: {
            type: String,
            // required: true
        },
        children: [userSchema]
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            maxlength: 100,
        },
        password: {
            type: String,
            select: false,
            required: true,
        },
        role: {
            type: String,
            enum: ['admin', 'teacher', 'student'],
            default: 'student',
        },
        identityNumber: {
            type: String,
            // required: true
        },
        firstName: {
            type: String,
            // required: true,
            maxlength: 50,
        },
        middleName: {
            type: String,
            // required: true,
            maxlength: 50,
        },
        lastName: {
            type: String,
            // required: true,
            maxlength: 50,
        },
        dateOfBirth: {
            type: Date,
            // required: true,
        },
        address: {
            type: String,
            // required: true
        },
        phoneNumber: {
            type: String,
            // required: true
        },
        parents: [parentSchema],
        courses: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

userSchema.virtual('age').get(() => {
    const today = new Date();
    const { dateOfBirth } = this;

    const diff = today.getTime() - dateOfBirth.getTime();
    // convert ms to year and return
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

userSchema.virtual('fullName').get(() => {
    return `${this.firstName} ${this.middleName} ${this.lastName}`
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Parent', parentSchema);
