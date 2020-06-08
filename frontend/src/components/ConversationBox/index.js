import React, {useState} from "react"

const ConversationBox = ({messages, participants}) => {
    const [showParticipants, setShowParticipants] = useState(false)
    const [showMessages, setShowMessages] = useState(true)
    console.log(showParticipants)
    console.log(showMessages)
    console.log(messages)
    console.log(participants)
    return (
        <h1>panel</h1>
    )
}

export default ConversationBox