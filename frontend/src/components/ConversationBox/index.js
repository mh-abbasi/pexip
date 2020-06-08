import React, {useState} from "react"
import styles from './ConversationBox.module.css'
import ParticipantsList from "../ParticipantsList";
import Messages from "../Messages";

const ConversationBox = ({messages, participants, username}) => {
    const [showParticipants, setShowParticipants] = useState(false)
    const [showMessages, setShowMessages] = useState(true)
    return (
        <div className={styles.container}>
            <ParticipantsList isShowing={showParticipants} participants={participants} />
            <Messages messages={messages} isShowing={showMessages} username={username}/>
        </div>
    )
}

export default ConversationBox