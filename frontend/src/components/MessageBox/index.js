import React, {useEffect, useState} from 'react'
import styles from './MessageBox.module.css'

const MessageBox = ({editingMessage, onSubmit, inputMessage, setInputMessage}) => {

    const onChange = event => {
        setInputMessage(event.target.value)
    }

    const onKeyDown = (event) => {
        if( event.keyCode === 13 ) {
            onSubmit(inputMessage.trim())
        }
    }
    return (
        <div className={styles.container}>
            <textarea className={styles.input} placeholder="Your Message..." onKeyDown={onKeyDown} value={inputMessage} onChange={onChange} />
        </div>
    )
}
export default MessageBox