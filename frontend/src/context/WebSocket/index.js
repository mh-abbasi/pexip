import React, {createContext, useEffect, useState} from 'react'

const WebSocketContext = createContext({
    ws: null,
    connect: () => {},
    hasError: null,
    disconnect: () => {}
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

    const disconnect = () => {
        if( wsConnection !== null ) {
            wsConnection.close()
            setWsConnection(null)
            setHasError(false)
        }
    }
    const connect = () => {
        setWsConnection(null)
        setHasError(null)
        try {
            const ws = new WebSocket(address)
            ws.addEventListener('error',event => {
                console.log('first?')
                setWsConnection(null)
                setHasError(true)
                console.log('connection has an error', event)
            });
            ws.addEventListener('open', event => {
                console.log('sage inja')
                setWsConnection(ws)
            });
            ws.addEventListener('close', event => {
                console.log('sage inja 2')
                console.log(event)
                setHasError(!event.wasClean)
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
        <WebSocketContext.Provider value={{
            ws: wsConnection,
            connect: connect,
            hasError: hasError,
            disconnect: disconnect
        }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketProvider, WebSocketContext}