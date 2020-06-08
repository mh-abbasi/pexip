import React, {useState} from "react"
import styles from './Messages.module.css'
import Message from "../Message";

const Messages = ({messages, showMessages, username}) => {
    return (
        <div className={styles.container}>
            {messages.length && (
                messages.map(message => {
                    return (
                        <Message message={message} username={username}  key={message.id}/>
                    )
                })
            )}

        </div>
    )
}

export default Messages