import { RoomCode } from "../components/RoomCode";

import 'material-design-icons/iconfont/material-icons.css';
import "../styles/rooms.css"

type propsType = {
    roomId: string;
    text: string;
    isPrivate?: boolean | undefined;
    isEnded?: boolean | undefined;
}

export function Rooms( {
    roomId,
    text,
    isPrivate = false,
    isEnded = false,
}: propsType) {
    return (
        <div className="Rooms">
            <h2>{text}</h2>
            <div>
                {!isEnded ?(
                    <RoomCode text="Copiar Código" code={roomId}/>
                ) : (
                    <RoomCode text="Sala Encerrada" isEnded code="#"/>
                )}
                
                <span className="material-icons pulbicOrPrivate">
                    {isPrivate ? <span>&#xe897;</span> : <span>&#xe80b;</span>}
                </span>
            </div>
        </div>
    );
}