const { Router } = require('express');
require('dotenv').config();
const auth = require('../../middleware/auth.middleware');
const Movie = require('../../models/Movie');

const Genre = require('../../models/Genre');
const Actor = require('../../models/Actor');

const movieRouter = Router();

movieRouter.get('/', auth, async (request, response) => {
  try {
    const movies = await Movie.find({})
      .populate('genres', 'title -_id')
      .populate({
        path: 'cast',
        populate: { path: 'actorId', select: 'name -_id' },
      });
    response.status(200).json(movies);
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.get('/:id', auth, async (request, response) => {
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


// movieRouter.post('/create/genre', async (request, response) => {
//   try {
//     const { title } = request.body;
//     const genre = new Genre({
//       title,
//     });

//     await genre.save();
//     response.status(201).json({ message: `Genre - ${title} is created` });
//   } catch (error) {
//     response
//       .status(500)
//       .json({ message: 'Something went wrong, try again...' });
//     console.log(error);
//   }
// });

movieRouter.post('/create/actor', async (request, response) => {
  try {
    const { name, image } = request.body;
    const actor = new Actor({
      name,
      image,
    });

    await actor.save();
    response.status(201).json({ message: `Actor - ${name} is created` });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.post('/create/movie', async (request, response) => {
  try {
    const {
      title,
      poster,
      type,
      genres,
      cast,
      movieDescription,
      ageRating,
      apiIMDbId,
      releaseDate,
      trailers,
      film,
      seasons,
    } = request.body;
    const movie = new Movie({
      title,
      poster,
      type,
      genres,
      cast,
      movieDescription,
      ageRating,
      apiIMDbId,
      releaseDate,
      trailers,
      film,
      seasons,
    });

    await movie.save();
    response.status(201).json({ message: `Movie - ${title} is created` });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

module.exports = movieRouter;
