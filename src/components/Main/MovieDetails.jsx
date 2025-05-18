import {useCallback, useEffect, useMemo, useState} from "react";
import StarRating from "../shared/StarRating";

const KEY = '9fe50e69';

export default function MovieDetails({id, watched, onAddWatched, onCloseMovie}) {
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState(0);

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

    }, [id, getMovieDetails]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;
        return () => document.title = 'usePopcorn';
    }, [title])

    useEffect(() => {
        function handleKeydown(e) {
            const keycodes = ['Escape', 'Backspace'];
            if (keycodes.includes(e.code)) {
                e.preventDefault();
                onCloseMovie();
            }
        }
        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, [onCloseMovie]);

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

    const isWatched = useMemo(() => {
        return watched.find(w => w.imdbID === id);
    }, [watched, id]);

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
                    {isWatched ? (
                        <p style={{textAlign: 'center'}}>You rated this movie {isWatched.userRating} ⭐</p>
                    ) : (
                        <>
                        <StarRating key={id} onRate={r => setUserRating(r)} />
                        {userRating > 0 && <button className="btn-add" onClick={handleAddWatched}>+ Add to list</button>}
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