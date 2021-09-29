import '../styles/stats.css';

type QuestionsType = {
    firstStats?: number | undefined;
    secondStats?: number | undefined;
    text: string;
    borderColor?: string | undefined;
    textColor?: string | undefined;
    bgcolor?: string | undefined;
}

export function Stats( {
    firstStats  = 0, 
    secondStats = 0,
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
            <h3>{firstStats ? firstStats : secondStats} {text} </h3>
        </div>
    );
}
