import React, {useState} from "react"
import styles from './Message.module.css'

const Message = ({message, username}) => {
    const {timestamp, message: text, from} = message
    const date = new Date(timestamp)
    const dateString = (date.getHours() < 10 ? '0' : '') + date.getHours() +':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    const currentSender = from === username ? styles.to : ''
    return (
        <div className={`${styles.container} ${currentSender}`}>
            <div><span className={styles.sender}>{from}</span> <span className={styles.time}>{dateString}</span></div>
            <div className={styles.message}>
                {text}
            </div>
        </div>
    )
}

export default Message