import React from "react"
import styles from './ParticipantItem.module.css'

const ParticipantItem = ({participant, activeUser, onDisconnect}) => {
    return (
        <div className={styles.container}>
            <span className={styles.username}>{participant}</span>
            {activeUser && (
                <button onClick={onDisconnect} className={styles.leaveButton}>Leave</button>
            )}
        </div>
    )
}

export default ParticipantItem