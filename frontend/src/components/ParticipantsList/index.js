import React from "react";
import styles from './ParticipantsList.module.css'
import ParticipantItem from "../ParticipantItem";

const ParticipantsList = ({isShowing, participants}) => {
    console.log('participants from here')
    console.log(participants)
    const isActive = isShowing ? styles.active : styles.active
    const participantsElems = []
    participants.forEach(participant => {
        participantsElems.push(<ParticipantItem participant={participant} key={participant} />)
    })
    console.log(participantsElems)
    return (
        <div className={`${styles.container} ${isActive}`}>
            {participantsElems.length && (participantsElems)}
        </div>
    )
}

export default ParticipantsList