import React, {useState} from "react"
import styles from './ConversationBox.module.css'
import ParticipantsList from "../ParticipantsList";
import Messages from "../Messages";
import MessageBox from "../MessageBox";

const TABS = {
    MESSAGES : 'MESSAGES',
    PARTICIPANTS : 'PARTICIPANTS',
}
const ConversationBox = ({messages, editingMessage, participants, username, onSubmit, inputMessage, setInputMessage, handleEditButton, handleDeleteButton}) => {
    const [tabToShow, setTabToShow] = useState(TABS.MESSAGES)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h4>Status Meeting Standup</h4>
                </div>
                <div className={styles.tabs}>
                    <div
                        className={`${styles.tab} ${tabToShow === TABS.PARTICIPANTS ? styles.activeTab : ''}`}
                        onClick={() => setTabToShow(TABS.PARTICIPANTS)}>Participants ({participants.size})</div>
                    <div className={`${styles.tab} ${tabToShow === TABS.MESSAGES ? styles.activeTab : ''}`} onClick={() => setTabToShow(TABS.MESSAGES)}>Chat</div>
                </div>
                <div className={styles.chatContainer}>
                    <ParticipantsList isShowing={tabToShow === TABS.PARTICIPANTS} participants={participants} />
                    <div className={`${styles.messagesContainer} ${tabToShow === TABS.MESSAGES ? styles.active : ''}`}>
                        <Messages
                            messages={messages}
                            username={username}
                            handleEditButton={handleEditButton}
                            handleDeleteButton={handleDeleteButton}
                            editingMessage={editingMessage}
                        />
                        <MessageBox onSubmit={onSubmit} inputMessage={inputMessage} setInputMessage={setInputMessage}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ConversationBox