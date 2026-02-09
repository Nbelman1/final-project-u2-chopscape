// clear message log on logout
// display empty message on login

// TODO: add timestamps
// TODO: limit messages to 7 most recent 
// TODO: if time, add a scroll bar

const MessageLog = ({ messages = [] }) => {

    return (
        <div className="message-log-container">  
            
            {messages.map((msg, index) => (
            <p key={index}>{msg}</p>))}

        </div>
    );
};

export default MessageLog;
