// clear message log on logout
// display empty message on login

// displays console message with timestamps


const MessageLog = ({ messages = [] }) => {

    return (
        <div className="message-log-container">  
            
            {messages.map((msg, index) => (
            <p key={index}>{msg}</p>))}

        </div>
    );
};

export default MessageLog;
