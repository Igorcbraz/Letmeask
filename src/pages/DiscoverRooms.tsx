import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { Stats } from '../components/Stats';
import { Rooms } from '../components/Rooms';
import { Button } from '../components/Button';

import { useRooms } from '../hooks/useRooms';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/discoverRoom.css';
import { ToastContainer } from 'react-toastify';

export function DiscoverRooms() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const {rooms} = useRooms();

    const roomsOpen = rooms.filter(room => !room.endedAt);

    async function handleCreateRoom(){
        if(!user){
          await signInWithGoogle();
        }
        
        history.push('/rooms/new');
    }
    
    return (
        <div id="page-root">
            <header>
                <div className="content">
                    <Logo width="157" height="75"/>
                    <div>
                        <ToggleTheme/>
                    </div>
                </div>
            </header>
            
            <main>
                <div className="title">
                    <h1>Todas as Salas</h1>
                    {rooms.length > 0 ? (
                        <span>{rooms.length} sala(s)</span>
                    ) : (
                        <span>Nenhuma Sala</span>
                    )}
                </div>

                <div className="all-stats">
                    <Stats text="Abertas"  firstStats={roomsOpen.length} borderColor="var(--purple)"/>
                    <Stats text="Fechadas" secondStats={rooms.length - roomsOpen.length}  borderColor="var(--pink-dark)"/>

                    <Button className="button new-room" onClick={handleCreateRoom}>Crie sua sala</Button>
                </div>
                
                
                <div className="rooms-list">
                    {rooms.map(room => {
                        return(
                            <Rooms text={room.name}  roomId={room.id} isEnded={room.endedAt ? true : false} isPrivate={room.isPrivate ? true : false}/>       
                        );
                    })}
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
    );
}