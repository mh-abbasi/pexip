import React, {useContext, useEffect, useState} from 'react'
import styles from './Chat.module.css'
import {isJson} from "../../common";
import {WebSocketProvider, WebSocketContext} from "../../context/WebSocket";
import {TYPES, ACTIONS} from '../../constants'
import Login from "../../components/Login";
console.log(TYPES, ACTIONS)
const Chat = () => {
    const [showParticipants, setShowParticipants] = useState(false)
    const [showMessages, setShowMessages] = useState(true)
    const {ws} = useContext(WebSocketContext)
    const [userId, setUserId] = useState(null)
    const [messages, setMessages] = useState([])
    const [participants, setParticipants] = useState([])

    const handleIncomingMessage = ({data}) => {
        console.log(data)
        if( isJson(data) ) {
            const parsed = JSON.parse(data)
            switch (parsed.type) {
                case TYPES.NEW_MESSAGE:
                    break
                case TYPES.CURRENT_USER:
                    setUserId(parsed.user.id)
                    setParticipants(parsed.participants)
                    setMessages(parsed.messages)
                    break
                case TYPES.USER_LOGGED_IN:

                    break
                case TYPES.USER_DISCONNECTED:
                    break
                case TYPES.MESSAGE_EDITED:
                    break
                case TYPES.MESSAGE_DELETED:
                    break
                default:
                    console.log('Unsupported type from server', parsed)
            }
        }

    }
    useEffect(() => {
        console.log(ws)
        if( ws && ws.readyState ) {
            ws.addEventListener('message', handleIncomingMessage);
        }

    },[ws])

    const onLogin = (username) => {
        ws.send(JSON.stringify({
            payload: {
                username
            },
            action: ACTIONS.LOGIN
        }));
    }

    return (
        <>
            {!userId
                ?
                (<Login
                    onSubmit={onLogin}
                />)
                :
                (
                    <h1>panel</h1>
                )}
        </>
    )
}

export default Chat