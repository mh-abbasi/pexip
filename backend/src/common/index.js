const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const sortByKey = (array, key) => {
    return array.slice().sort(function(a, b)
    {
        const x = a[key]
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

const sendAll = (payload, wss) => {
    const {clients} = wss
    for (let i=0; i < clients.length; i++) {
        if( clients[i].userName ) {
            clients[i].send(JSON.stringify({
                ...payload
            }));
        }
    }
}

const isUserConnected = (userName, wss) => {
    const {clients} = wss
    let found = -1
    clients.forEach((client, index) => {
        if(client.userName === userName){
            found = index
        }
    })
    return found
}

const getAllParticipants = (users, wss) => {
    const participants = []
    wss.clients.forEach(client => {
        if( client.userName && client.id ) {
            const userIndex = users.findIndex(user => user.username === client.userName)
            if( userIndex !== -1 ) {
                const participant = {
                    ...users[userIndex]
                }
                if( participants.findIndex(person => person.id === participant.id) === -1 ) {
                    participants.push(participant)
                }
            }
        }
    })
    return participants
}

module.exports = {
    isJson,
    sortByKey,
    sendAll,
    isUserConnected,
    getAllParticipants
}