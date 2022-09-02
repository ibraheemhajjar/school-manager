const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema(
    {
        courseName: {
            type: String,
            required: true
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        duration: {
            type: Number,
        },
        courseDays: {
            type: String,
            enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        grades: {
            firstExam: {
                type: Number,
                min: 0,
                max: 20
            },
            secondExam: {
                type: Number,
                min: 0,
                max: 20
            },
            thirdExam: {
                type: Number,
                min: 0,
                max: 20
            },
            finalExam: {
                type: Number,
                min: 0,
                max: 40
            },
            total: {
                type: Number,
                min: 0,
                max: 100
            }
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('Course', courseSchema);
