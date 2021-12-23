const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId: Types.ObjectId,
    films: [
        {
            filmId: Types.ObjectId,
            currentTime: Number, 
        }
    ],
    serials: [
        {
            serialId: Types.ObjectId,
            episodeId: Types.ObjectId,
            currentTime: Number,
            active: Boolean 
        }
    ],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: null }
});

module.exports = model('ContinueWatching', schema);