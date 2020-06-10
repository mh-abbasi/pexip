import React from "react"
import styles from './ConnectionIndicator.module.css'

const ConnectionIndicator = ({connect, hasError, ws}) => {
    return (
        <div className={styles.container}>
            {
                ws !== null ? (
                    hasError === true ? (
                        <>
                            <h1 className={styles.textCenter}>error</h1>
                            <button onClick={connect} className={styles.submit}>reconnect</button>
                        </>
                    ) : (<h3 className={styles.textCenter}>Connecting...</h3>)
                ) : (
                    hasError === null ? (<h2 className={styles.textCenter}>Connecting...</h2>) :
                        (
                            <>
                                <h3 className={styles.textCenter}>Connection failed, Try to reconnect</h3>
                                <button onClick={connect} className={styles.submit}>Connect</button>
                            </>
                        )
                )
            }
        </div>
    )
}

export default ConnectionIndicator