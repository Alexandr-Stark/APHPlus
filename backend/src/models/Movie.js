const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    title: String,
    poster: Object,
    type: String, // Serial || Film
    genres: [{type: Types.ObjectId, ref: 'Genres'}],
    cast: [{
        actorId: {type: Types.ObjectId, ref: 'Actors'},
        asCharacter: String
    }],
    movieDescription: String,
    ageRating: String,
    apiIMDbId: String, 
    releaseDate: Date,
    trailers: [{
        trailerId: Types.ObjectId,
        title: String,
        trailer: Object
    }],
    film: String,
    seasons: [{ // null for type: Film
        seasonId: Types.ObjectId,
        seasonNumber: Number,
        episodes: [{
            episodeId: Types.ObjectId, // Serials id
            episodeNumber: Number,
            title: String,
            poster: Object, 
            episodeDescription: String,
            ageRating: String,
            releaseDate: Date,
            episode: Object
        }],
    }],
});

module.exports = model('Movies', schema);