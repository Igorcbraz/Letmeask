import '../styles/stats.css';

type QuestionsType = {
    numAnswered?: number | undefined;
    numLikes?: number | undefined;
    text: string;
    borderColor?: string | undefined;
    textColor?: string | undefined;
    bgcolor?: string | undefined;
}

export function Stats( {
    numAnswered = 0, 
    numLikes    = 0,
    text,
    borderColor,
    textColor   = borderColor,
    bgcolor     = "transparent",
}: QuestionsType){
    return(
        <div 
            className="room-stats" 
            style={{
                borderColor: `${borderColor}`,
                color: `${textColor}`,
                backgroundColor: `${bgcolor}`,
            }}
        >
            <h3>{text} {numAnswered ? numAnswered : numLikes} </h3>
        </div>
    );
}
