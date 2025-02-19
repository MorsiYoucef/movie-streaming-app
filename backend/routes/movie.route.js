import express from 'express';
import { getTrendingMovie,getTrailersMovie,getDetailsMovie,getSimilarMovies, getMoviesByCategory } from '../controller/movie.controllers.js';

const router = express.Router();

router.get("/trending", getTrendingMovie)
router.get("/:id/trailers", getTrailersMovie) 
router.get("/:id/details", getDetailsMovie)
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;