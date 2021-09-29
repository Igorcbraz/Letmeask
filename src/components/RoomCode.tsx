import copyImg from '../assets/images/copy.svg'
import highlightOff from '../assets/images/highlight-off.svg'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/room-code.css';

type RoomCodeProps = {
    code: string;
    text?: string | undefined;
    isEnded?: boolean;
}

export function RoomCode({
    code,
    text,
    isEnded = false,
}: RoomCodeProps) {
    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(code);

        toast.success('Copiado para área de transferência', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }

    return(
        <button className={!isEnded ? "room-code" : "closed-room"} onClick={!isEnded ? copyRoomCodeToClipBoard : () => {}}>
            <div>
                {!isEnded ? (
                    <img src={copyImg} alt="Copy room code"/>
                ) : (
                    <img src={highlightOff} alt="Sala encerrada"/>
                )}
                
                {!text ? (
                    <span>Sala #{code}</span>
                ) : (
                    <span>{text}</span>
                )}
                
            </div>
        </button>
    );
}