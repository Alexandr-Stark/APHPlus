const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  nickname: { type: String, required: true },
  birthday: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  paymentCards: [
    {
      name: { type: String, required: true },
      surname: { type: String, required: true },
      cardNumber: { type: String, required: true },
      expirationDate: {
        month: { type: Number, required: true },
        year: { type: Number, required: true },
      },
    },
  ],
  createdAt: { type: Date, default: new Date() },
  modifiedAt: { type: Date, default: null },
});

module.exports = model('Users', schema);
