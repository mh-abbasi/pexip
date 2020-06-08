import React, {createContext, useEffect, useState} from 'react'

const WebSocketContext = createContext({
    ws: null,
})

const WebSocketProvider = ({children}) => {
    const {
        REACT_APP_WS_HOST: host,
        REACT_APP_WS_PORT: port,
        REACT_APP_WS_SECURE: isSecure
    } = process.env
    const address = (isSecure ? 'wss://' : 'ws://') + (host ? host : 'localhost')+ ':' + (port ? port : '5000')
    const [wsConnection, setWsConnection] = useState(null)

    useEffect(() => {
        if( !wsConnection ) {
            try {
                const ws = new WebSocket(address)
                ws.addEventListener('error',event => {
                    console.log('connection has an error', event)
                });
                ws.addEventListener('open', event => {
                    console.log('connection opened')
                    setWsConnection(ws)
                });
                ws.addEventListener('close', event => {
                    setWsConnection(null)
                });
            }
            catch (e) {
                console.log(e)
            }
        }
    }, [])

    return (
        <WebSocketContext.Provider value={{ws: wsConnection}}>
            {children}
        </WebSocketContext.Provider>
    )
}

export {WebSocketProvider, WebSocketContext}