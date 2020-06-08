import React, {useContext, useEffect, useState} from 'react'
import {isJson} from "../../common";
import {WebSocketContext} from "../../context/WebSocket";
import {TYPES, ACTIONS} from '../../constants'
import Login from "../../components/Login";
import ConversationBox from "../../components/ConversationBox";

const Chat = () => {
    const {ws} = useContext(WebSocketContext)
    const [userName, setUserName] = useState(null)
    const [editingMessage, setEditingMessage] = useState(null)
    const [inputMessage, setInputMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [participants, setParticipants] = useState(new Set())

    const handleIncomingMessage = ({data}) => {
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
                    parsed.participants.forEach(participant => {
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
                    setMessages(prevState => {
                        const editedMessages = prevState
                        const messageIndex = editedMessages.findIndex(message => message.id === parsed.message.id)
                        if( messageIndex > -1 ) {
                            editedMessages[messageIndex].message = parsed.message.message
                        }
                        return [...editedMessages]
                    })
                    setInputMessage('')
                    setEditingMessage(null)
                    break
                case TYPES.MESSAGE_DELETED:
                    setMessages(prevState => {
                        return prevState.filter(message => message.id !== parsed.id)
                    })

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

    const onSubmit = (text) => {
        if( text.trim().length ) {
            if( !editingMessage ) {
                ws.send(JSON.stringify({
                    payload: {
                        message: text
                    },
                    action: ACTIONS.SEND_MESSAGE
                }));
            } else {
                ws.send(JSON.stringify({
                    payload: {
                        text,
                        id: editingMessage
                    },
                    action: ACTIONS.EDIT_MESSAGE
                }));
            }
        }

    }

    const handleEditButton = id => {
        setEditingMessage(id)
        const message = messages.find(message=> message.id === id)
        if( message ) {
            setInputMessage(message.message.trim())
        }
    }
    const handleDeleteButton = id => {
        ws.send(JSON.stringify({
            action: ACTIONS.DELETE_MESSAGE,
            payload: {
                id
            }
        }))
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
                        handleEditButton={handleEditButton}
                        handleDeleteButton={handleDeleteButton}
                        username={userName}
                        onSubmit={onSubmit}
                        messages={messages}
                        editingMessage={editingMessage}
                        inputMessage={inputMessage}
                        setInputMessage={setInputMessage}
                        participants={participants}
                    />
                )}
        </>
    )
}

export default Chat