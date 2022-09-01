const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            maxlength: 100,
        },
        firstName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        children: [userSchema]
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
        },
        duration: {
            type: Number,
        },
        courseDays: {
            type: String,
            enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        }

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
        },
        role: {
            type: String,
            enum: ['admin', 'teacher', 'student'],
            default: 'student',
        },
        identityNumber: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        middleName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: true,
            maxlength: 50,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        parents: [parentSchema],
        courses: {
            type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Parent', parentSchema);
module.exports = mongoose.model('Course', courseSchema);
