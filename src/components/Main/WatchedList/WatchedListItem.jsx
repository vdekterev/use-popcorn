export default function WatchedListItem({ title, poster, imdbRating, userRating, runtime, onDelete, onSelect }) {
    function handleDelete(e) {
        e.stopPropagation();
        onDelete();
    }
    return (
        <li onClick={onSelect}>
            <img src={poster} alt={`${title} poster`}/>
            <h3>{title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{runtime} min</span>
                </p>
                <button className="btn-delete" onClick={handleDelete}>x</button>
            </div>
        </li>
    );
}