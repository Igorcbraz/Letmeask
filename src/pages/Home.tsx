import Modal  from 'react-modal';

import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
  
import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { ToastContainer, toast } from 'react-toastify';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.css';
import 'react-toastify/dist/ReactToastify.css';
import 'material-design-icons/iconfont/material-icons.css';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] =  useState('');
    
    const [ visibility, setVisibility] = useState(false)
    const [ tentativas, setTentativas] = useState(0);
    const [ roomPassword, setRoomPassword] = useState('');
    const [ modalIsOpen, setModalIsOpen] = useState(false);

    async function handleCreateRoom(){
        if(!user){
          await signInWithGoogle();
        }
        
        history.push('rooms/new');
    }

    async function confirmIsPrivate(){
        const roomRef = await database.ref(`rooms/${roomCode}`).get();
        
        if(roomPassword === roomRef.val().password){
            history.push(`/rooms/${roomCode}`);
            return;
        } else{
            setTentativas(tentativas + 1)
        }
        if(tentativas >= 1 && tentativas < 4) {
            toast.error('Senha incorreta', {
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
        
        setModalIsOpen(false);
        setRoomPassword('');
    }

    async function handleJoinRoom(event : FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            toast.error('Insira valores válidos', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()){
            toast.error('Sala inexistente', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }

        if(roomRef.val().endedAt){
            toast.error('A Sala já foi encerrada', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            return;
        }

        if(roomRef.val().isPrivate){
            if(tentativas <= 3){
                setModalIsOpen(true);
            } else {
                setModalIsOpen(false);
                toast.error('Número máximo de tentativas atingido', {
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
            return;
        }


        history.push(`/rooms/${roomCode}`);
    }

    async function handleDiscoverRooms(){
        if(!user){
            await signInWithGoogle();
        }

        history.push(`/rooms/discover`);
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>          

            <main id="room-main">               

                <div className="main-content">
                    <div className="DarkModeToggle">
                       <ToggleTheme/>
                    </div>
    
                    <Logo width="357" height="155"/>
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    

                    <div className="separator">ou entre em uma sala</div>

                    <form id="form-auth" onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>

                    <Button onClick={handleDiscoverRooms} isOutlined style={{marginTop: 10}}>
                            Descobrir novas salas
                    </Button>
                </div>
            </main>

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
            <Modal
                isOpen={modalIsOpen}
                aria={{
                    labelledby: "heading",
                    describedby: "full_description"
                    }}
                id="modalDelete"
            >
                <div className="modalDeleteItems">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="var(--danger)">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>

                    <h1>Sala Privada</h1>
                    <p>Digite a senha para entrar na sala</p>

                    <div className="passwordDiv">
                        <input
                            type={visibility ? "text" : "password"}
                            id="password"
                            onChange={event => setRoomPassword(event.target.value)}
                            value={roomPassword}
                        />
                        
                        <button id="visibilityBtn" onClick={visibility ? () => setVisibility(false) : () => setVisibility(true)}>
                            <span 
                                className="material-icons iconVisibility"
                            >
                                { visibility          ? 
                                <span>&#xe8f4;</span> : 
                                <span>&#xe8f5;</span>}
                            </span>
                        </button>
                    </div>

                    <div>
                        <button id="buttonClose" onClick={() => setModalIsOpen(false)}>Cancelar</button>
                        <button id="buttonDelete" onClick={confirmIsPrivate}>Entrar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}