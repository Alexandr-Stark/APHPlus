const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    title: String,
    poster: String,
    type: String, // Serial || Film
    genres: [{type: Types.ObjectId, ref: 'Genres'}],
    cast: [{
        actorId: {type: Types.ObjectId, ref: 'Actors'},
        asCharacter: String
    }],
    movieDescription: String,
    ageRating: Number,
    apiIMDbId: Number, 
    releaseDate: Date,
    trailers: [{
        trailerId: String,
        title: String,
        trailer: String
    }],
    film: String,
    seasons: [{ // null for type: Film
        seasonId: String,
        seasonNumber: Number,
        episodes: [{
            episodeId: String, // Serials id
            episodeNumber: Number,
            title: String,
            poster: String, 
            episodeDescription: String,
            ageRating: String,
            releaseDate: Date,
            episode: String
        }],
    }],
});

module.exports = model('Movies', schema);