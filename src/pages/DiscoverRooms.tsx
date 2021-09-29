import { Logo } from '../components/Logo';
import { ToggleTheme } from '../components/ToggleTheme';
import { Stats } from '../components/Stats';
import { Rooms } from '../components/Rooms';

import { useRooms } from '../hooks/useRooms';

import '../styles/discoverRoom.css';

type RoomsParams = {
    id: string;
}

export function DiscoverRooms() {
    const {rooms} = useRooms();
    console.log(rooms)

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
                    <span>num salas</span>
                </div>

                <div className="all-stats">
                    <Stats text="Abertas"  numAnswered={0} borderColor="var(--purple)"/>
                    <Stats text="Fechadas" numLikes={0}    borderColor="var(--pink-dark)"/>
                </div>
                
                
                <div className="rooms-list">
                    {rooms.map(room => {
                        return(
                            <Rooms text={room.name}  roomId={room.id}/>       
                        );
                    })}
                </div>
                
            </main>

            
        </div>
    );
}