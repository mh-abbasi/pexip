import React from "react"
import styles from './ConnectionIndicator.module.css'

const ConnectionIndicator = ({connect, hasError, ws}) => {
    return (
        <div className={styles.container}>
            {
                ws !== null ? (
                    hasError === true ? (
                        <>
                            <h1 className={styles.textCenter}>Connection has error!</h1>
                            <button onClick={connect} className={styles.submit}>Reconnect</button>
                        </>
                    ) : (<h3 className={styles.textCenter}>Connecting...</h3>)
                ) : (
                    hasError === null ? (<h2 className={styles.textCenter}>Connecting...</h2>) :
                        hasError === true ?
                        (
                            <>
                                <h3 className={styles.textCenter}>Error in connection!</h3>
                                <button onClick={connect} className={styles.submit}>Try Again</button>
                            </>
                        ) :
                            (
                                <>
                                    <h3 className={styles.textCenter}>Disconnected Successfully</h3>
                                    <button onClick={connect} className={styles.submit}>Connect</button>
                                </>
                            )
                )
            }
        </div>
    )
}

export default ConnectionIndicator