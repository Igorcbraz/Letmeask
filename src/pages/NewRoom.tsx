import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.css';
import { database } from '../services/firebase';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory();
    const [ newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event : FormEvent){ 
        event.preventDefault();
        
        if (newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/admin/rooms/${firebaseRoom.key}`);
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
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
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
                        <p>
                        Quer entrar em uma sala existente ? <Link to="/">Clique aqui</Link>
                        </p>
                    </form>
                </div>
            </main>

        </div>
    )
}