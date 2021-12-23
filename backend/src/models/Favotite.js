const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    userId: Types.ObjectId,
    movies: [{type: Types.ObjectId, ref: 'Movies'}],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: null },
});

module.exports = model('Favotites', schema);