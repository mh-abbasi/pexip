import React, {useState} from "react"
import styles from './ConversationBox.module.css'
import ParticipantsList from "../ParticipantsList";
import Messages from "../Messages";
import MessageBox from "../MessageBox";

const TABS = {
    MESSAGES : 'MESSAGES',
    PARTICIPANTS : 'MESSAGES',
}
const ConversationBox = ({messages, participants, username, onSubmit, inputMessage, setInputMessage}) => {
    const [tabToShow, setTabToShow] = useState(TABS.MESSAGES)
    return (
        <div className={styles.container}>
            <ParticipantsList isShowing={tabToShow === TABS.PARTICIPANTS} participants={participants} />
            <div className={styles.messagesContainer}>
                <Messages messages={messages} username={username}/>
                <MessageBox onSubmit={onSubmit} inputMessage={inputMessage} setInputMessage={setInputMessage}/>
            </div>
        </div>
    )
}

export default ConversationBox