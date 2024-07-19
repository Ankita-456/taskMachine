const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    addresses: [
        {
            address: {
                type: String,
                required: true
            },
        },
    ],

}, { timestamps: true }
)

module.exports = mongoose.model('userDetail', userDetailSchema);