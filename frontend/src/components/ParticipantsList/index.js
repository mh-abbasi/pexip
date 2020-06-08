import React from "react";
import styles from './ParticipantsList.module.css'
import ParticipantItem from "../ParticipantItem";

const ParticipantsList = ({isShowing, participants}) => {
    const isActive = isShowing ? styles.active : ''
    const participantsElems = []
    participants.forEach(participant => {
        participantsElems.push(<ParticipantItem participant={participant} key={participant} />)
    })
    return (
        <div className={`${styles.container} ${isActive}`}>
            {participantsElems.length && (participantsElems)}
        </div>
    )
}

export default ParticipantsList