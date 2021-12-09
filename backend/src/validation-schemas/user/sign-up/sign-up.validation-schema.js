const { body, validationResult } = require('express-validator');
const { PASSWORD, EMAIL, PHONE}  = require('../../constants');

const singUpValidator = {
 password: (value, { req }) => {
      if (value === '') {
        throw new Error(`empty password field`);
      }
      if (value.length <= PASSWORD.MIN_LENGTH) {
        throw new Error(`min password lenght is ${PASSWORD.MIN_LENGTH}`);
      }
      if(value.length > PASSWORD.MAX_LENGTH){
        throw new Error(`max password lenght is ${PASSWORD.MAX_LENGTH}`);
      }
      if(!PASSWORD.REGEXP_ONE_DIGIT.test(value)){
        throw new Error( `password should contain at least one digit`);
      }
      if(!PASSWORD.REGEXP_ONE_LOWERCASE.test(value)){
        throw new Error( `password should contain at least one lower case`);
      }
      if(!PASSWORD.REGEXP_ONE_UPPERCASE.test(value)){
        throw new Error( `password should contain at least one upper case`);
      }
      return true;
  },
  email: (value, { req }) => {
    if (value === '') {
      throw new Error(`empty email field`);
    }
    if (!EMAIL.test(value)) {
      throw new Error(`wrong email`);
    }
    return true;
  },
  passwordConfirmation: (value, { req }) => {
    if (value === '') {
      throw new Error(`empty password confirmation field`);
    }
    if (value !== req.body.password) {
      throw new Error(`passwords not matched`);
    }
    return true;
  },
  phoneNumber: (value, { req }) => {
    if (value === '') {
      throw new Error(`empty phone field`);
    }
    if (!PHONE.test(value)) {
      throw new Error(`no correct phone number`);
    }
    return true;
  }, 
};
module.exports = singUpValidator;
