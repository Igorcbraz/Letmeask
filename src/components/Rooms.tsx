import { RoomCode } from "../components/RoomCode";

import "../styles/rooms.css"

type RoomsParams = {
    id: string;
}

type propsType = {
    roomId: string;
    text: string;
}

export function Rooms(props : propsType) {
    return (
        <div className="Rooms">
            <h2>{props.text}</h2>
            <RoomCode text="Copiar Código" code={props.roomId}/>    
        </div>
    );
}