const { Router } = require('express');
const auth = require('../../middleware/auth.middleware');
const Genre = require('../../models/Genre');

const genreRouter = Router();


genreRouter.get('/', auth, async (request, response) => {
    try {
      const genres = await Genre.find({});
      response.status(200).json(genres);
    } catch (error) {
      response
        .status(500)
        .json({ message: 'Something went wrong, try again...' });
      console.log(error);
    }
  });

  module.exports = genreRouter;