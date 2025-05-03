import MovieListItem from "./MovieListItem";

export default function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map(movie => (
                <MovieListItem
                    key={movie.imdbID}
                    title={movie.Title}
                    poster={movie.Poster}
                    year={movie.Year}
                    onSelectMovie={() => onSelectMovie(movie.imdbID)}
                />
            ))}
        </ul>
    );
}