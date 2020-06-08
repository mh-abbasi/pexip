import React, {useState} from "react"
import styles from './ConversationBox.module.css'
import ParticipantsList from "../ParticipantsList";

const ConversationBox = ({messages, participants}) => {
    const [showParticipants, setShowParticipants] = useState(false)
    const [showMessages, setShowMessages] = useState(true)
    console.log(showParticipants)
    console.log(showMessages)
    console.log(messages)
    console.log(participants)
    return (
        <div className={styles.container}>
            <ParticipantsList isShowing={showParticipants} participants={participants} />
        </div>
    )
}

export default ConversationBox