import React from "react";
import styles from './ParticipantsList.module.css'
import ParticipantItem from "../ParticipantItem";

const ParticipantsList = ({isShowing, participants, username, onDisconnect}) => {
    const isActive = isShowing ? styles.active : ''
    const participantsElems = []
    participants.forEach(participant => {
        const activeUser = participant === username
        participantsElems.push(<ParticipantItem
            participant={participant}
            key={participant}
            activeUser={activeUser}
            onDisconnect={onDisconnect}
        />)
    })
    return (
        <div className={`${styles.container} ${isActive}`}>
            {participantsElems.length && (participantsElems)}
        </div>
    )
}

export default ParticipantsList