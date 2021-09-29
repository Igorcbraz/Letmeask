import copyImg from '../assets/images/copy.svg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../styles/room-code.css';

type RoomCodeProps = {
    code: string;
    text?: string | undefined;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code);

        toast.success('Copied to clipboard', {
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
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="Copy room code"/>
                {!props.text ? (
                    <span>Sala #{props.code}</span>
                ) : (
                    <span>{props.text}</span>
                )}
                
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </button>
    );
}