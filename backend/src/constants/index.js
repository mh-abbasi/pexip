// types
const USER_DISCONNECTED = 'USER_DISCONNECTED'
const USER_LOGGED_IN = 'USER_LOGGED_IN'
const NEW_MESSAGE = 'NEW_MESSAGE'
const CURRENT_USER = 'CURRENT_USER'
const MESSAGE_EDITED = 'MESSAGE_EDITED'
const MESSAGE_DELETED = 'MESSAGE_DELETED'
// actions
const LOGIN = 'LOGIN'
const SEND_MESSAGE = 'SEND_MESSAGE'
const EDIT_MESSAGE = 'EDIT_MESSAGE'
const DELETE_MESSAGE = 'DELETE_MESSAGE'

module.exports = {
    TYPES: {
        USER_DISCONNECTED,
        USER_LOGGED_IN,
        NEW_MESSAGE,
        CURRENT_USER,
        MESSAGE_EDITED,
        MESSAGE_DELETED
    },
    ACTIONS: {
        SEND_MESSAGE,
        EDIT_MESSAGE,
        DELETE_MESSAGE,
        LOGIN
    }
}