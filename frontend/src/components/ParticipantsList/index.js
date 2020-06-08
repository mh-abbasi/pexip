import React from "react";
import styles from './ParticipantsList.module.css'
import ParticipantItem from "../ParticipantItem";

const ParticipantsList = ({isShowing, participants}) => {
    const isActive = isShowing ? styles.active : styles.active
    return (
        <div className={`${styles.container} ${isActive}`}>
            {participants.length && (
                participants.map(participant => {
                    return (
                        <ParticipantItem participant={participant} key={participant.id} />
                    )
                })
            )}
        </div>
    )
}

export default ParticipantsList