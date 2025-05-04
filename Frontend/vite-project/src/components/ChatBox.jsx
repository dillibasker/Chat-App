import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import socket from "../socket";
import MessageInput from "./MessageInput";

export default function ChatBox({ selected }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/messages/${user._id}/${selected._id}`).then((res) => setMessages(res.data));

    socket.on("receiveMessage", (msg) => {
      if ((msg.sender === selected._id && msg.receiver === user._id)) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selected]);

  return (
    <div style={{ flex: 1 }}>
      <h3>Chat with {selected.name}</h3>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}><b>{msg.sender === user._id ? "Me" : selected.name}:</b> {msg.content}</p>
        ))}
      </div>
      <MessageInput to={selected._id} onSend={(msg) => setMessages((prev) => [...prev, msg])} />
    </div>
  );
}