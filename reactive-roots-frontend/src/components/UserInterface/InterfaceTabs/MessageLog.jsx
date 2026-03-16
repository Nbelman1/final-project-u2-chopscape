import { useEffect, useRef } from 'react';
import './MessageLog.css';

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
