import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.css';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
                <span>Sala #{props.code}</span>
            </div>
        </button>
    );
}