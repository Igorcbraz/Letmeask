import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseRooms=Record<string,{
    authorId:string,
    title:string,
    endeAt?:string,
    isPrivate: boolean;
} >

type RoomType = {
    id: string;
    name: string;
    endedAt?: string;
    isPrivate: boolean;
}

export function useRooms(){
    const [rooms, setRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const roomsRef = database.ref(`rooms/`);

        roomsRef.on('value', room => {
            const databaseRooms = room.val();
            const rooms: FirebaseRooms = databaseRooms ?? {};
            const parsedRooms = Object.entries(rooms).map(([key, value]:any) => {
                return{
                    id: key,
                    name: value.title,
                    endedAt: value?.endedAt,
                    isPrivate: value.isPrivate,
                }
            });
            setRooms(parsedRooms);
        }, function(error){console.log(error)}) // If have an error in query, this functions going show what is

        return () => {
            roomsRef.off('value');
        }
    }, [])

    return {rooms};
}