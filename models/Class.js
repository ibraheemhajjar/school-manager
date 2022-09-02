const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSchema = new Schema(
    {
        classGrade: {
            type: String,
            required: true
        },
        classRoom: {
            floor: {
                type: String,
                required: true
            },
            roomNumber: {
                type: Number,
                required: true
            }
        },
        capacity: {
            type: Number,
            required: true
        },
        instructor: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        students: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        }
    },
    { toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

module.exports = mongoose.model('Class', classSchema);
