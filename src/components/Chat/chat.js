import './chat.sass';
import Input from '../Input/input';
import Message from '..//Message/message';
import Header from '..//Header/header';
import {useEffect, useRef } from 'react';
import uniqid from 'uniqid'
import io from 'socket.io-client'
import { blobTobase64, base64ToBlob } from '../../helpers/base64';
import { useDispatch } from 'react-redux';
import { useMessages, useUsers } from '../../hooks'

const Chat = () => {
    const users = useUsers()
    const messages = useMessages()
    const socket = useRef(null)
    const content = useRef(null)
    const dispatch = useDispatch()
    function scrollToBottom() {
        content.current.scrollTo(0, content.current.scrollHeight)
    }

    async function onSubmit(value) {
        const message = {
            id: uniqid(),
            text: value.text,
            img: value.img?.url,
            user: users[0]
        }

        const data = {
            ...message
        } 
        if (value.img){
            data.img = await blobTobase64(value.img.file)
        } 

        socket.current.emit('message', data)
        
        dispatch({
            type: 'MESSAGE_ADDED',
            payload: message
        }) 
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])
    useEffect(() => {
        const sk = io('http://localhost:5001')
        socket.current = sk
        sk.on('auth', data => {
            const currentUser = data.users.find(item => item.id === data.id)
            const filteredUsers = data.users.filter(item => item.id !== data.id)
            dispatch({
                type: 'USERS_FETCHED',
                payload: [currentUser, ...filteredUsers]
            }) 
        })
        sk.on('addUser', data => {
            dispatch({
                type: 'USER_ADDED',
                payload: data
            }) 
        })
        sk.on('deleteUser', id => {
            dispatch({
                type: 'USER_DELETED',
                payload: id
            }) 
        })
        sk.on('message', async message => {
            let img = null
            if (message.img){
                const blob = await base64ToBlob(message.img)
                img = URL.createObjectURL(blob)
            }
            dispatch({
                type: 'MESSAGE_ADDED',
                payload: { ...message, img }
            }) 
        })
    }, [])
    return (
        <div className="wrapper">
            <div className="Chat">
                <Header 
                    text="Чат"
                    users={users}  
                />
                <div className="content" ref={content}>
                    {messages.map(message => (
                        <Message
                            key={message.id}
                            text={message.text}
                            user={message.user}
                            imgUrl={message.img}
                        />
                    ))}
                </div>
                <Input onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Chat;
