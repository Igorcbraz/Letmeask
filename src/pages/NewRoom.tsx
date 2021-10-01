import Modal  from 'react-modal';

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

    const [ isPrivate, setIsPrivate] = useState(false);
    const [ roomPassword, setRoomPassword] = useState('');
    const [ modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        if(user){
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
        }
    }, [])
    
    function confirmIsPrivate(){
        setIsPrivate(true)
        setModalIsOpen(false)
    }

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
            isPrivate: isPrivate,
            password: roomPassword,
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
                        <div>
                            <button 
                                type="button"
                                id="btn1" 
                                onClick={() => setIsPrivate(false)} 
                                style={{background: `${isPrivate ? 'var(--light-grey' : 'var(--purple)'}`}}
                            >
                                Pública
                            </button>
                            <button 
                                type="button"
                                id="btn2" 
                                onClick={() => setModalIsOpen(true)}  
                                style={{background: `${isPrivate ? 'var(--purple)' : 'var(--light-grey)'}`}}
                            >
                                Privada
                            </button>
                        </div>

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

                    <h1>Adicionar senha</h1>
                    <p>Digite a senha desejada para a sua sala</p>
                    <div className="passwordDiv">
                        <input 
                            type="password" 
                            id="password" 
                            onChange={event => setRoomPassword(event.target.value)}
                            value={roomPassword}
                        />
                    </div>

                    <div>
                        <button id="buttonClose" onClick={() => setModalIsOpen(false)}>Cancelar</button>
                        <button id="buttonDelete" onClick={confirmIsPrivate}>Confirmar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}