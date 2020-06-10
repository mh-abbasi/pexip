import React, {createContext, useEffect, useState} from 'react'

const WebSocketContext = createContext({
    ws: null,
    connect: null,
    hasError: null
})

const WebSocketProvider = ({children}) => {
    const {
        REACT_APP_WS_HOST: host,
        REACT_APP_WS_PORT: port,
        REACT_APP_WS_SECURE: isSecure
    } = process.env
    const address = (isSecure ? 'wss://' : 'ws://') + (host ? host : 'localhost')+ ':' + (port ? port : '5000')
    const [wsConnection, setWsConnection] = useState(null)
    const [hasError, setHasError] = useState(null)

    const connect = () => {
        try {
            const ws = new WebSocket(address)
            ws.addEventListener('error',event => {
                setHasError(true)
                console.log('connection has an error', event)
            });
            ws.addEventListener('open', event => {
                setWsConnection(ws)
            });
            ws.addEventListener('close', event => {
                setHasError(false)
                setWsConnection(null)
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if( !wsConnection ) {
            connect()
        }
    }, [])

    return (
        <WebSocketContext.Provider value={{ws: wsConnection, connect: connect, hasError: hasError}}>
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketProvider, WebSocketContext}