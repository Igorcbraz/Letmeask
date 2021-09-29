import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';

import { database } from '../services/firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.css';


export function NewRoom(){
    const { user, signInWithGoogle } = useAuth();
    const history = useHistory();
    const [ newRoom, setNewRoom] = useState('');

    useEffect(() => {
        toast.success('Login realizado com sucesso', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }, [])
    
    async function handleCreateRoom(event : FormEvent){ 
        event.preventDefault();

        if (newRoom.trim() === ''){
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

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/admin/rooms/${firebaseRoom.key}`);
    }

    async function handleDiscoverRooms(){
        if(!user){
            await signInWithGoogle();
        }

        history.push(`/rooms/discover`);
    }

    return(
        <div id="page-auth">
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
                    
                    <div className="titleBox">
                        <img
                            src={user?.avatar}
                            alt={user?.name}
                        />
                        <h2>
                            Olá <span style={{color:'#E559F9'}}>{user?.name}</span>
                            , Vamos criar uma nova sala ?
                        </h2>
                    </div>

                    <form id="form-auth" onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala" 
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                        <Button onClick={handleDiscoverRooms} isOutlined style={{marginTop: 10}}>
                            Descobrir novas salas
                        </Button>
                        <p>
                        Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link>
                        </p>
                        
                    </form>
                </div>
            </main>
        
        </div>
    )
}