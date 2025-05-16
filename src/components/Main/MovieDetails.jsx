import {useCallback, useEffect, useRef, useState} from "react";
import StarRating from "../shared/StarRating";

const KEY = '9fe50e69';

export default function MovieDetails({id, isWatched, onAddWatched, onCloseMovie}) {
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState(0);
    const isMovieWatched = useRef({});

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const getMovieDetails = useCallback(async id => {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
        const data = await res.json();
        setMovie(data);
    }, [])

    useEffect(() => {
        if (!id) return;
        void getMovieDetails(id);
        isMovieWatched.current = isWatched();

    }, [id, getMovieDetails]);

    function handleAddWatched() {
        const newMovie = {
            imdbID: id,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ')[0]),
            userRating
        }
        onAddWatched(newMovie);
    }

    return (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onCloseMovie}>←</button>
                <img src={poster} alt={`Poster of ${title}`}/>
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>{released} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p><span>⭐️</span>{imdbRating}</p>
                </div>
            </header>
            <section>
                <div className="rating">
                    {isMovieWatched.current?.userRating > 0 ? (
                        isMovieWatched.current.userRating
                    ) : (
                        <>
                        <StarRating key={id} onRate={r => setUserRating(r)} />
                        {userRating > 0 && (
                            <button className="btn-add" onClick={handleAddWatched}>+ Add to list</button>
                        )}
                        </>
                    )}

                </div>
                <p><em>{plot}</em></p>
                <p>Starring: {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}