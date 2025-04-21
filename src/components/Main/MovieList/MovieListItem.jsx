export default function MovieListItem({ poster, title, year}) {
    return (
        <li>
            <img src={poster} alt={`${title} poster`}/>
            <h3>{title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{year}</span>
                </p>
            </div>
        </li>
    );
}