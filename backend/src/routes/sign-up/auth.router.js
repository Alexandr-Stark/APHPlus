const { Router } = require('express');
const bcrypt = require('bcryptjs');
//const User = require('../../models/User');
const User = require('../../models/User');
const singUpValidator = require('../../validation-schemas/user/sign-up/sign-up.validation-schema');
const { check, validationResult } = require('express-validator');
const userRouter = Router();

userRouter.post(
    '/sign-up',
    [
        check('email').custom(singUpValidator.email),
        check('password').custom(singUpValidator.password),
        check('passwordConfirmation').custom(singUpValidator.passwordConfirmation),
        check('phone').custom(singUpValidator.phoneNumber),
    ],
    async (request, response) => {
    try {

        const validationErrors = validationResult(request);
        if(!validationErrors.isEmpty()){
            return response.status(400).json({
                errors: validationErrors.array(),
                message: "Invalid reg data"
            });
        }

        const {
            nickname,
            name,
            surname,
            birthday,
            email,
            phone,
            password
        } = request.body; 

        const isEmailExists = await User.findOne({email});
        if(isEmailExists){
            response.status(400).json({message: `User with ${email} already exist!`});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            nickname,
            name,
            surname,
            birthday,
            phoneNumber: phone,
            email,
            password: hashedPassword
        });

        await user.save();
        response.status(201).json({message: 'User is created'});
        
    } catch (error) {
        response.status(500).json({message: 'Something went wrong, try again...'});
        console.log(error);
    }
});


userRouter.post('/sign-in', async (request, response) => {});

module.exports = userRouter;