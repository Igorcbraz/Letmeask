import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { Stats } from '../components/Stats';
import { Rooms } from '../components/Rooms';

import { useRooms } from '../hooks/useRooms';

import '../styles/discoverRoom.css';

export function DiscoverRooms() {
    const {rooms} = useRooms();

    const roomsOpen = rooms.filter(room => !room.endedAt);
    
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
                </div>
                
                
                <div className="rooms-list">
                    {rooms.map(room => {
                        return(
                            <Rooms text={room.name}  roomId={room.id} isEnded={room.endedAt ? true : false}/>       
                        );
                    })}
                </div>
                
            </main>

            
        </div>
    );
}