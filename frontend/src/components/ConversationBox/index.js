import React, {useState} from "react"
import styles from './ConversationBox.module.css'
import ParticipantsList from "../ParticipantsList";

const ConversationBox = ({messages, participants}) => {
    const [showParticipants, setShowParticipants] = useState(false)
    const [showMessages, setShowMessages] = useState(true)

    return (
        <div className={styles.container}>
            <ParticipantsList isShowing={showParticipants} participants={participants} />
        </div>
    )
}

export default ConversationBox