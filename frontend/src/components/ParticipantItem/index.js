import React from "react"
import styles from './ParticipantItem.module.css'

const ParticipantItem = ({participant}) => {
    return (
        <div className={styles.container}>
            <span className={styles.username}>{participant}</span>
        </div>
    )
}

export default ParticipantItem