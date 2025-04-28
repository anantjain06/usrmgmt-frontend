import React, { useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../config/ApiConstant";
import Loader from "../components/Loader";

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {

        if (!input) return;
        setLoading(true);
        const userMessage = { text: input };
        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");

        const { data } = await axios.post(API_ENDPOINTS.CHAT, userMessage);
        setLoading(false);
        setMessages([...messages, { text: input, sender: "user" }, { text: data.txt, sender: "bot" }]);
    };

    return (

        <div className="chat-container">
            <div>
                {loading ? (
                    <Loader /> // Show loader when waiting for messages
                ) : messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))
                ) : (
                    <Loader /> // Show loader if messages are empty
                )}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
