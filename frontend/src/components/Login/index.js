import React, {useState} from "react";
import styles from './Login.module.css'

const Login = ({onSubmit}) => {
    const [username, setUsername] = useState('')
    const onChange = (ev) => {
        setUsername(ev.target.value)
    }
    const onLogin = () => {
            onSubmit(username)
    }
    const onKeyDown = (ev) => {
        if( ev.keyCode === 13 ) {
            onLogin()
        }
    }
    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                onChange={onChange}
                value={username}
                placeholder='Username'
                onKeyDown={onKeyDown}
            />
            <button
                className={styles.submit}
                onClick={onLogin}
            >Login</button>
        </div>
    )
}

export default Login