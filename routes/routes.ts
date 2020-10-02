//routes.ts
import { Router } from "https://deno.land/x/oak/mod.ts";
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie} from '../controllers/movies.ts';

const router = new Router();

router.get('/api/movies', getMovies)
    .get('/api/movies/:id', getMovie)
    .post('/api/movie', addMovie)
    .put('/api/movies/:id', updateMovie)
    .delete('/api/movies/:id', deleteMovie)
export default router;