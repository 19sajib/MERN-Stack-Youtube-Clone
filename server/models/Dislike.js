const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    commentId : {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }

}, { timestamps: true })


const DisLike = mongoose.model('DisLike', dislikeSchema);

module.exports = { DisLike }