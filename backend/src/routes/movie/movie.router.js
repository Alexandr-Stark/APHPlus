const { Router } = require('express');
require('dotenv').config();
const auth = require('../../middleware/auth.middleware');
const Movie = require('../../models/Movie');

const Genre = require('../../models/Genre');
const Actor = require('../../models/Actor');
const Favorite = require('../../models/Favotite');
const ContinueWatching = require('../../models/ContinueWatching');

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
    const movies = await Movie.findById(request.params.id)
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

movieRouter.post('/add-to-favorite', auth, async (request, response) => {
  try {
    const { userId, movieId } = request.body;

    const isFavoriteExists = await Favorite.findOne({ userId });

    if (isFavoriteExists) {
      if (isFavoriteExists.movies.includes(movieId)) {
        return response
          .status(400)
          .json({ message: `Movie - already exists in favorite list` });
      }

      isFavoriteExists.movies.push(movieId);
      isFavoriteExists.modifiedAt = new Date();
      await isFavoriteExists.save();
      return response
        .status(201)
        .json({ message: `Movie - added to exiting favorite list` });
    }

    const favorite = new Favorite({
      userId,
      movies: movieId,
    });

    await favorite.save();
    response.status(201).json({ message: `Movie - added to favorites` });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.post('/remove-from-favorite', auth, async (request, response) => {
  try {
    const { userId, movieId } = request.body;

    const isFavoriteExists = await Favorite.findOne({ userId });

    if (!isFavoriteExists) {
      return response
        .status(400)
        .json({ message: `User - not have favorite list` });
    }

    if (!isFavoriteExists.movies.includes(movieId)) {
      return response
        .status(400)
        .json({ message: `Movie - not exists in favorite list` });
    }

    isFavoriteExists.movies.splice(isFavoriteExists.movies.indexOf(movieId), 1);
    isFavoriteExists.modifiedAt = new Date();
    await isFavoriteExists.save();
    response
      .status(200)
      .json({ message: `Movie - deleted from favorite list` });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.get('/my-list/:userId', /*auth,*/ async (request, response) => {
  try {
    const favorites = await Favorite.findOne({ userId: request.params.userId });
    // .populate('movies');
    response.status(200).json(favorites.movies);
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.post('/remove-from-contunue-watching', /*auth,*/ async (request, response) => {
  try {
    const { userId, movieId, isSerial } = request.body;

    const isContinueWatchingExists = await ContinueWatching.findOne({ userId });
    // console.log(isContinueWatchingExists);

    if (!isContinueWatchingExists) {
      return response
        .status(400)
        .json({ message: `User - not have iContinue Watching list` });
    }

    if(isSerial){
      for(let i = 0; i <= isContinueWatchingExists.serials.length; i++){
        if(isContinueWatchingExists.serials[i]?.serialId.toString() === movieId){
          isContinueWatchingExists.serials.splice(i, 1);
          i--;
        }
      }
      await isContinueWatchingExists.save();
      return response
      .status(200)
      .json({ message: `Serial - deleted from continue watch list` });
    }

    if (!isContinueWatchingExists.films.find( item => item.filmId.toString() === movieId)){
      return response
        .status(400)
        .json({ message: `Movie - not exists in continue watch list` });
    }
    else {
      isContinueWatchingExists.films.splice(isContinueWatchingExists.films.find( (item, ind) => item.filmId.toString() === movieId && ind), 1);
      await isContinueWatchingExists.save();
      response
      .status(200)
      .json({ message: `Movie - deleted from favorite list` });
    }

    // if (!isContinueWatchingExists.films.find( item => item.filmId === movieId)){
    //   return response
    //     .status(400)
    //     .json({ message: `Movie - not exists in continue watch list` });
    // }

    // isFavoriteExists.movies.splice(isFavoriteExists.movies.indexOf(movieId), 1);
    // isFavoriteExists.modifiedAt = new Date();
    // await isFavoriteExists.save();
    // response
    //   .status(200)
    //   .json({ message: `Movie - deleted from favorite list` });
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.get('/contunue-watching/:userId', /*auth,*/ async (request, response) => {
  try {
    const continueWatching = await ContinueWatching.findOne({ userId: request.params.userId });
    const serialSet = new Set(continueWatching.serials.map( (item) => item.serialId.toString()));
    const listMoviesId = continueWatching.films.map( (item) => item.filmId).concat(Array.from(serialSet));
    response.status(200).json(listMoviesId);
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.get('/favorite/getall', auth, async (request, response) => {
  try {
    const movies = await Movie.find({ _id: { $in: request.query.moviesId } })
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

movieRouter.get('/episode-credentials/:id', /*auth,*/ async (request, response) => {
  try {
    const movies = await Movie.findById(request.params.id);
    if(!movies) return response.status(500).json({message: 'Not found movie'});
      const episode = movies.seasons.map( (item) => item.episodes.find( (ep) => ep._id.toString() === request.query.episodeId.toString() && ep))
      .find(i => i !== null && i);
      // console.log('episode', episode);
      return response.status(200).json(episode);
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.get('/last-viewed-episode/:id', /*auth,*/ async (request, response) => {
  try {
    const serialsList = await ContinueWatching.findOne({userId: request.query.userId});
    const episode = serialsList.serials.find( (item) => (item.serialId.toString() ===  request.params.id && item.active === true) && item.episodeId);
    // console.log(episodeId.episodeId);
    if(!episode){
      const movies = await Movie.findById(request.params.id);
      if(!movies) return response.status(500).json({message: 'Not found movie'});
      const pilot = movies.seasons[0].episodes[0];
      return response.status(200).json(pilot._id);
    } 
    return response.status(200).json(episode.episodeId);
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.get('/video-current-time/:id', /*auth,*/ async (request, response) => {
  try {
    let currentTime = 0;
    const watchList = await ContinueWatching.findOne({userId: request.query.userId});
    if(request.query.episodeId){
      const episodeTime = watchList.serials.find( (item) => ( (item.serialId.toString() === request.params.id) && (item.episodeId.toString() === request.query.episodeId) ) && item.currentTime);
      //const episodeTime = watchList.serials[1]
      // console.log('episodeTime', episodeTime);
      if(episodeTime) currentTime = episodeTime.currentTime;
      return response.status(200).json(currentTime);
    }
    const filmTime = watchList.films.find( (item) => item.filmId.toString() === request.params.id && item.currentTime);
    if(filmTime) currentTime = filmTime.currentTime;
    // console.log('I am here');
    return response.status(200).json(currentTime);
  } catch (error) {
    response
      .status(500)
      .json({ message: 'Something went wrong, try again...' });
    console.log(error);
  }
});

movieRouter.post('/video-current-time', /*auth,*/ async (request, response) => {
  try {
    const { userId, filmId, serialId, episodeId, currentTime } = request.body;
    let movie = await ContinueWatching.findOne({ userId });

    if (movie) {
     if(filmId){
       const isFilmExists = movie.films.map( (item) => item.filmId.toString() ).indexOf(filmId.toString());
       if(isFilmExists !== -1){
         const tempFilmParam = {
          filmId : movie.films[isFilmExists].filmId, 
          currentTime : currentTime, 
          _id : movie.films[isFilmExists]._id
         };

         movie.films.splice(isFilmExists, 1, tempFilmParam);
         await movie.save();

         return response
        .status(200)
        .json({ message: `Film - currentTime updated in exiting Continue Watching list` });
       }
       movie.films.push({filmId, currentTime});
       await movie.save();
       return response
       .status(201)
       .json({ message: `Film - added to exiting Continue Watching list` });
     }

    const isSerialExists = movie.serials.map( (item) => item.episodeId.toString() ).indexOf(episodeId.toString());
    movie.serials.forEach( (item) => item.active = false);  
    if(isSerialExists !== -1){
      const tempSerialParam = {
        serialId : movie.serials[isSerialExists].serialId, 
        episodeId: movie.serials[isSerialExists].episodeId,
        currentTime : currentTime,
        active: true, 
        _id : movie.serials[isSerialExists]._id
       };
      movie.serials.splice(isSerialExists, 1, tempSerialParam);
      await movie.save();
      return response
     .status(200)
     .json({ message: `Serial- currentTime updated in exiting Continue Watching list` });
    }
    movie.serials.push({serialId, episodeId, currentTime, active: true});
    await movie.save();
    return response
       .status(201)
       .json({ message: `Serial - added to exiting Continue Watching list` });
    }

    if(filmId){
      movie = new ContinueWatching({
        userId,
        films: [{
          filmId,
          currentTime
        }],
        serials: []
      });
      await movie.save();
      return response
         .status(201)
         .json({ message: `ContinueWatching - is created with Film` });
    }
    movie = new ContinueWatching({
      userId,
      films: [],
      serials: [{
        serialId,
        episodeId,
        currentTime,
        active: true
      }]
    });
    await movie.save();
    return response
       .status(201)
       .json({ message: `ContinueWatching - is created with Serial` });

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
