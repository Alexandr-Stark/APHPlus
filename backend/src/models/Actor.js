const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: null },
});

module.exports = model('Actors', schema);