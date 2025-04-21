import MovieListItem from "./MovieListItem";

export default function MovieList({movies}) {
    return (
        <ul className="list">
            {movies?.map(movie => (
                <MovieListItem
                    key={movie.imdbID}
                    title={movie.Title}
                    poster={movie.Poster}
                    year={movie.Year}
                />
            ))}
        </ul>
    );
}