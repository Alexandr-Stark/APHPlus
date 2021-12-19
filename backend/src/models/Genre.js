const { Schema, model} = require('mongoose');

const schema = new Schema({
  title: { type: String },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: null },
});

module.exports = model('Genres', schema);
