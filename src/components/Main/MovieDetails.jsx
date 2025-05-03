import {Suspense, useEffect, useState} from "react";
import Loader from "../shared/Loader";

const KEY = '9fe50e69';

export default function MovieDetails({id, onCloseMovie}) {
    const [movie, setMovie] = useState({});

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
    useEffect(() => {
        async function getMovieDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
            const data = await res.json();
            setMovie(data);
        }

        if (!id) return;
        getMovieDetails();
    }, [id]);
    return (
        <div className="details">
            <Suspense fallback={<Loader/>}>
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
                    <p><em>{plot}</em></p>
                    <p>Starring: {actors}</p>
                    <p>Directed by {director}</p>
                </section>
            </Suspense>
        </div>
    );
}