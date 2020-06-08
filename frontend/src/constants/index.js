// types
const USER_DISCONNECTED = 'USER_DISCONNECTED'
const USER_LOGGED_IN = 'USER_LOGGED_IN'
const NEW_MESSAGE = 'NEW_MESSAGE'
const CURRENT_USER = 'CURRENT_USER'

// actions
const LOGIN = 'LOGIN'
const SEND_MESSAGE = 'SEND_MESSAGE'
const EDIT_MESSAGE = 'EDIT_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'

export default {
    TYPES: {
        USER_DISCONNECTED,
        USER_LOGGED_IN,
        NEW_MESSAGE,
        CURRENT_USER,
    },
    ACTIONS: {
        SEND_MESSAGE,
        EDIT_MESSAGE,
        DELETE_MESSAGE,
        LOGIN
    }
}