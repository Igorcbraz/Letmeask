import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
  
import illustrationImg from '../assets/images/illustration.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.css';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] =  useState('');

    async function handleCreateRoom(){
        if(!user){
          await signInWithGoogle();
        }
        
        history.push('rooms/new');
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
        </div>
    )
}