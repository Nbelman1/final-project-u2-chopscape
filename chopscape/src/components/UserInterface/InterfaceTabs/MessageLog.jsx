import { useEffect, useRef } from 'react';
import './MessageLog.css';

// clear message log on logout
// display empty message on login

// TODO: add timestamps
// TODO: limit messages to 7 most recent 
// TODO: if time, add a scroll bar

const MessageLog = ({ messages = [] }) => {

    // reference container
    const logContainerRef = useRef(null);



    // run when messages are updated
    useEffect(() => {
        if(logContainerRef.current) {
            const container = logContainerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="message-log" ref={logContainerRef}>  
            
            {messages.map((msg, index) => (
            <p key={index}>{msg}</p>))}
            
        </div>
    );
};

export default MessageLog;
