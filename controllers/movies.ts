import { IMovies } from "../types.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

let movies: IMovies[] = [
    {
        id: '1',
        name: "Inception",
        genre: "mystery"
    },
    {
        id: '2',
        name: "The Dark Knight",
        genre: "fiction"
    },
    {
        id: '3',
        name: "IO",
        genre: "sci-fi"
    },
]

const getMovies = ({response}: {response: any}) => {
    response.body = {
        success: true,
        data: movies
    };
}

const getMovie = ({ params, response }: { params: { id: string }, response: any}) => {
    const movie: IMovies | undefined = movies.find(m => m.id === params.id);
    if(movie) {
        response.status = 200;
        response.body = {
        success: true,
        data: movie
    }
    } else {
        response.status = 404;
        response.body = {
        success: false,
        message: "No movies found"
    }
}
}

const addMovie = async ({ request, response }: { request: any, response: any}) => {
    const body = await request.body()
    if(!request.hasBody) {
        response.status = 404;
        response.body = {
        success: false,
        message: "No data received"
    }
    } else {
        const movie: IMovies = body.value;
        movie.id = v4.generate();
        movies.push(movie);
        response.status = 201;
            response.body = {
                success: true,
                data: movie
             }
    }
    }

const updateMovie = async ({ params, request, response}: { params: { id: string}, request: any, response: any}) => {
    const movie: IMovies | undefined = movies.find(b => b.id === params.id);
    if(movie) {
        const body = await request.body()
        const updateData: { name?: string; genre?: string; } = body.value;
        movies = movies.map(m => m.id === params.id ? {...m, ...updateData} : m);
        response.status = 200;
        response.body = {
        success: true,
        data: movies
    }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            message: "No data received"
         }
        }
    }


const deleteMovie = ({ params, response}: { params: { id: string}, response: any}) => {
    const movie: IMovies | undefined = movies.find(m => m.id === params.id);
    if(movie) {
        movies = movies.filter(m => m.id !== params.id);
        response.status = 200;
        response.body = {
            success: true,
            message: "Selected movie is removed",
            data: movies
        }
    } else {
        response.status = 404;
        response.body = {
        success: false,
        message: "No movie found"
    }
    }
}

export { getMovies,getMovie, addMovie, updateMovie, deleteMovie }