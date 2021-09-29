import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseRooms=Record<string,{
    authorId:string,
    title:string,
    endeAt?:string,
} >

type RoomType = {
    id: string;
    name: string;
    endedAt?: string;
}

export function useRooms(){
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const roomRef = database.ref(`rooms/`);

        roomRef.on('value', room => {
            const databaseRooms = room.val();
            const fireBaseRooms: FirebaseRooms = databaseRooms ?? {};
            const parsedRooms = Object.entries(fireBaseRooms).map(([key, value]) => {
                return{
                    id: key,
                    name: value.title,
                    endedAt: value?.endeAt,
                }});
            setRooms(parsedRooms);
        })

        return () => {
            roomRef.off('value');
        }
    }, [])

    return {rooms};
}