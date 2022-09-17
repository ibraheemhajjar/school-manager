const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            required: true,
        },
        role: {
            type: String,
            enum: ['superAdmin', 'admin', 'teacher', 'student'],
            default: 'student',
            required: true
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
        parentEmail: {
            type: String,
            required: true,
            maxlength: 100,
        },
        parentPhoneNumber: {
            type: String,
            required: true,
        },

        class: {
            type: Schema.Types.ObjectId,
            ref: 'Class'
        },
        courses: {
            type: [Schema.Types.ObjectId],
            ref: 'Course'
        },
        schoolName: {
            type: String,
            required: true
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }

)

userSchema.virtual('age').get(function () {
    const today = new Date();

    const dateOfBirth = this.dateOfBirth;

    const diff = today.getTime() - dateOfBirth.getTime();
    // convert ms to year and return
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
})

// marks: {
//     firstExam: {
//         type: Number,
//         min: 0,
//         max: 20
//     },
//     secondExam: {
//         type: Number,
//         min: 0,
//         max: 20
//     },
//     thirdExam: {
//         type: Number,
//         min: 0,
//         max: 20
//     },
//     finalExam: {
//         type: Number,
//         min: 0,
//         max: 40
//     },
//     total: {
//         type: Number,
//         min: 0,
//         max: 100
//     }
// }

module.exports = mongoose.model('User', userSchema);
