const {Router} = require('express');
require('dotenv').config();
const auth = require('../../middleware/auth.middleware');
const Movie = require('../../models/Movie');

const movieRouter = Router();

movieRouter.get('/', async(request, response) => {
    try {
        const movies = await Movie.find({});
        response.status(200).json(movies);
        
    } catch (error) {
        response
        .status(500)
        .json({ message: 'Something went wrong, try again...' });
      console.log(error);
    }
});

movieRouter.get('/:id', async(request, response) => {
    try {
        const movies = await Movie.findById(request.params.id);
        response.status(200).json(movies);
    } catch (error) {
        response
        .status(500)
        .json({ message: 'Something went wrong, try again...' });
      console.log(error);
    }
});

module.exports = movieRouter;