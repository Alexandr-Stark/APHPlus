const { Router } = require('express');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const singUpValidator = require('../../validation-schemas/user/auth/auth.validation-schema');
const { check, validationResult } = require('express-validator');
const userRouter = Router();

userRouter.post(
  '/sign-up',
  [
    check('email').custom(singUpValidator.email),
    check('password').custom(singUpValidator.password),
    check('passwordConfirmation').custom(singUpValidator.passwordConfirmation),
    check('phoneNumber').custom(singUpValidator.phoneNumber)
  ],
  async (request, response) => {
    try {

      const validationErrors = validationResult(request);
      if (!validationErrors.isEmpty()) {
        return response.status(400).json({
          errors: validationErrors.array(),
          message: 'Invalid sign-up data',
        });
      }

      const { nickname, name, surname, birthday, email, phoneNumber, password } =
        request.body;

      const isEmailExists = await User.findOne({ email });
      if (isEmailExists) {
        response
          .status(400)
          .json({ message: `User with ${email} already exist!` });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        nickname,
        name,
        surname,
        birthday,
        phoneNumber,
        email,
        password: hashedPassword,
      });

      await user.save();
      response.status(201).json({ message: 'User is created' });
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Something went wrong, try again...' });
      console.log(error);
    }
  },
);

userRouter.post(
    '/sign-in',
    [
        check('email').custom(singUpValidator.email),
        check('password').custom(singUpValidator.password)
      ], 
    async (request, response) => {
  try {

    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({
        errors: validationErrors.array(),
        message: 'Invalid sign-in data',
      });
    }

    const { email, password } = request.body;

    const user = await User.findOne({email});

    if(!user){
        return response.status(400).json({message: `User with ${email} not exist!`});
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if(!isPassMatch){
        return response.status(400).json({message: `Uncorrect password or login!`});
    }

    const token = jwt.sign(
        { userId: user.id } ,
        process.env.JWT_SECRET,
        { expiresIn: '5h' }
    );

    response.status(200).json({token, userId: user.id});
    
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

module.exports = userRouter;
