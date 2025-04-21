import WatchedListItem from "./WatchedListItem";

export default function WatchedList({watched}) {
    return (
        <ul className="list">
            {watched.map(movie => (
               <WatchedListItem
                   key={movie.imdbID}
                   title={movie.Title}
                   poster={movie.Poster}
                   imdbRating={movie.imdbRating}
                   userRating={movie.userRating}
                   runtime={movie.runtime}
               />
            ))}
        </ul>
    );
}