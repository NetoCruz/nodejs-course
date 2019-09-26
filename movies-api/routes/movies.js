const express = require('express');
const joi = require('@hapi/joi')
const MoviesService = require('../services/movies');
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
}= require('../utils/schemas/movies')

const validationHandler =require('../utils/middleware/validationHandler')
const chacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async function(req, res, next) {
    chacheResponse(res,FIVE_MINUTES_IN_SECONDS)
    const { tags } = req.query;

    try {
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      });
    } catch (err) {
      next(err);
    }
  });

  

  router.get(
    '/:movieId',
    validationHandler(joi.object({ movieId: movieIdSchema }), 'params'),
    async function(req, res, next) {
      chacheResponse(res,SIXTY_MINUTES_IN_SECONDS)
        const { movieId } = req.params
        try {
            const movie = await moviesService.getMovie({ movieId })
            res.status(200).json({
                data: movie,
                message: 'movie by id'
            })
        } catch (error) {
            next(error)
        }
    }
)


  router.post('/',validationHandler(createMovieSchema), async function(req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });

      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:movieId',validationHandler({movieId:movieIdSchema},'params'),validationHandler(updateMovieSchema), async function(req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie
      });

      res.status(200).json({
        data: updatedMovieId,
        message: 'movie updated'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:movieId',validationHandler({movieId:movieIdSchema},'params') ,async function(req, res, next) {
    const { movieId } = req.params;

    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId });

      res.status(200).json({
        data: deletedMovieId,
        message: 'movie deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = moviesApi;