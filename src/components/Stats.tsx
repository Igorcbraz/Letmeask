import '../styles/stats.css';

type QuestionsType = {
    numQuestions?: number | undefined;
    numLikes?: number | undefined;
    text: string;
    color?: string | undefined;
}

export function Stats( {
    numQuestions, 
    numLikes,
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
            <h3>{text} {numQuestions ? numQuestions : numLikes} </h3>
        </div>
    );
}
