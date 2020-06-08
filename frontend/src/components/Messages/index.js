import React, {useEffect, useState} from "react"
import styles from './Messages.module.css'
import Message from "../Message";

const Messages = ({messages, username, handleEditButton, handleDeleteButton}) => {

    return (
        <div className={styles.container}>
            {messages.length > 0 && (
                messages.map(message => {
                    return (
                        <Message
                            message={message}
                            username={username}
                            key={message.id}
                            handleEditButton={handleEditButton}
                            handleDeleteButton={handleDeleteButton}/>
                    )
                })
            )}

        </div>
    )
}

export default Messages