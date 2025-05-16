import { useCallback, useEffect, useState} from "react";
import StarRating from "../shared/StarRating";

const KEY = '9fe50e69';

export default function MovieDetails({id, onCloseMovie}) {
    const [movie, setMovie] = useState({});

    const {
        Title: title,
        // Year: year,
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
    }, [id])

    useEffect(() => {
        if (!id) return;
        void getMovieDetails(id);
    }, [id, getMovieDetails]);

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
                    <StarRating/>
                </div>
                <p><em>{plot}</em></p>
                <p>Starring: {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}