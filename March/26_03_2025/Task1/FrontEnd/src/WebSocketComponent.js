import React, { useState, useEffect } from "react";

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("Connected to WebSocket server"); 
        };

        socket.onmessage = async (event) => {
            if (event.data instanceof Blob) {
                // Convert Blob to text
                const text = await event.data.text();
                try {
                    const jsonData = JSON.parse(text);
                    setMessages(prev => [...prev, jsonData.message]);
                    console.log("Received B-T JSON:", jsonData);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            } else {
                try {
                    const jsonData = JSON.parse(event.data);
                    setMessages(prev => [...prev, jsonData.message]);
                    console.log("Received JSON raw:", jsonData);
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        };

        socket.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws && message.trim()) {
            ws.send(JSON.stringify({ message }));
            setMessage("");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2>WebSocket Chat</h2>
            <div style={{ height: "200px", overflow: "auto", border: "1px solid #ddd", padding: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default WebSocketComponent;
