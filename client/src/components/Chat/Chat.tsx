import React, { useState, useEffect, ReactEventHandler } from "react";
//@ts-ignore
import queryString from "query-string";
import io, { Socket } from "socket.io-client";
import styles from "./Chat.module.scss";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";


const ENDPOINT = 'localhost:5000';
let socket: Socket;

interface ChatProps
{
    location: any
}

const Chat: React.FC<ChatProps> = ({ location }) => 
{
    const [name, set_name] = useState('');
    const [users, set_users] = useState('');
    const [room, set_room] = useState('');
    const [message, set_message] = useState('');
    const [messages, set_messages] = useState<Array<any>>([]);

    
    useEffect(() => 
    {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        set_name(name);
        set_room(room);

        //console.log(socket);

        socket.emit('join', { name, room }, (error: any) => 
        {
            if (error) alert(error);
        });

        return () => 
        {
            socket.emit('socket_disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);


    useEffect(() => 
    {
        socket.on('message', message => 
        {
            set_messages(messages => [...messages, message]);
        });

        socket.on("room_data", ({ users }) => 
        {
            set_users(users);
        });

    }, []);


    const send_message = (e: React.KeyboardEvent<HTMLInputElement> | 
                            React.FormEvent | 
                            React.MouseEvent | 
                            React.TouchEvent) =>
    {
        e.preventDefault();

        if (message) socket.emit('send_message', message, () => set_message(''));
    }
    

    console.log(messages);


    return (
        <div className={`${styles.outer_container}`}>
            <div className={`${styles.container}`}>
                <InfoBar room={room}/>
                <Messages 
                    messages={messages} 
                    name={name}
                />
                <Input 
                    message={message}
                    set_message={set_message}
                    send_message={send_message}
                />
            </div> 
            <TextContainer users={users}/>
        </div>
    );
}

export default Chat;