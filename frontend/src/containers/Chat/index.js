import React, {useContext, useEffect, useState} from 'react'
import styles from './Chat.module.css'
import {isJson} from "../../common";
import {WebSocketProvider, WebSocketContext} from "../../context/WebSocket";
import {TYPES, ACTIONS} from '../../constants'
import Login from "../../components/Login";
import ConversationBox from "../../components/ConversationBox";

const Chat = () => {
    const {ws} = useContext(WebSocketContext)
    const [userName, setUserName] = useState(null)
    const [editingMessage, setEditingMessage] = useState(null)
    const [inputMessage, setInputMessage] = useState('')
    const [messages, setMessages] = useState([{
        id: 'qdkjfwefouwnje',
        from: 'system',
        timestamp: Date.now(),
        message: 'Welcome!'
    }])
    const [participants, setParticipants] = useState(new Set())

    const handleIncomingMessage = ({data}) => {
        console.log('incoming')
        console.log(data)
        let newParticipants = new Set([])
        if( isJson(data) ) {
            const parsed = JSON.parse(data)
            switch (parsed.type) {
                case TYPES.NEW_MESSAGE:
                    setMessages(prevState => ([...prevState, parsed.message]))
                    setInputMessage('')
                    break
                case TYPES.CURRENT_USER:
                    setUserName(parsed.user.username)
                    newParticipants = new Set([])
                    parsed.participants.map(participant => {
                        newParticipants.add(participant.username)
                    })
                    setParticipants(newParticipants)
                    break
                case TYPES.USER_LOGGED_IN:
                    setParticipants(prevState => (new Set([...prevState, parsed.user.username])))
                    break
                case TYPES.USER_DISCONNECTED:
                    setParticipants(prevState => {
                        const newParticipants = new Set([...prevState])
                        newParticipants.delete(parsed.username)
                        return newParticipants
                    })
                    break
                case TYPES.MESSAGE_EDITED:
                    const editedMessages = messages
                    const messageIndex = editedMessages.findIndex(message => message.id === parsed.message.id)
                    if( messageIndex > -1 ) {
                        editedMessages[messageIndex] = parsed.message
                    }
                    setMessages(editedMessages)
                    break
                case TYPES.MESSAGE_DELETED:
                    break
                default:
                    console.log('Unsupported type from server', parsed)
            }
        }

    }

    useEffect(() => {
        if( ws && ws.readyState ) {
            ws.addEventListener('message', handleIncomingMessage);
        }
    }, [ws])

    const onLogin = (username) => {
        ws.send(JSON.stringify({
            payload: {
                username
            },
            action: ACTIONS.LOGIN
        }));
    }

    const onSubmit = (payload) => {
        if( !editingMessage ) {
            ws.send(JSON.stringify({
                payload: {
                    message: payload
                },
                action: ACTIONS.SEND_MESSAGE
            }));
        }
        console.log(payload)
    }

    return (
        <>
            {!userName
                ?
                (<Login
                    onSubmit={onLogin}
                />)
                :
                (
                    <ConversationBox
                        onSubmit={onSubmit}
                        messages={messages}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        participants={participants}
                    />
                )}
        </>
    )
}

export default Chat