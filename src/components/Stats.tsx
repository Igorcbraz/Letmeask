import '../styles/stats.css';

type QuestionsType = {
    numAnswered?: number | undefined;
    numLikes?: number | undefined;
    text: string;
    color?: string | undefined;
}

export function Stats( {
    numAnswered = 0, 
    numLikes = 0,
    text,
    color,
}: QuestionsType){
    return(
        <div 
            className="room-stats" 
            style={{
                borderColor: `${color}`,
                color: `${color}`,
            }}
        >
            <h3>{text} {numAnswered ? numAnswered : numLikes} </h3>
        </div>
    );
}
