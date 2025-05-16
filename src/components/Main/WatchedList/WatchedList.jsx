import WatchedListItem from "./WatchedListItem";

export default function WatchedList({watched, onSelect, onDelete}) {
    return (
        <ul className="list list-watched">
            {watched.map(movie => (
               <WatchedListItem
                   key={movie.imdbID}
                   title={movie.title}
                   poster={movie.poster}
                   imdbRating={movie.imdbRating}
                   userRating={movie.userRating}
                   runtime={movie.runtime}
                   onSelect={() => onSelect(movie.imdbID)}
                   onDelete={() => onDelete(movie.imdbID)}
               />
            ))}
        </ul>
    );
}