import { useState } from "react";
import socket from "../socket";
import { useUser } from "../context/UserContext";

export default function MessageInput({ to, onSend }) {
  const [content, setContent] = useState("");
  const { user } = useUser();

  const handleSend = () => {
    const msg = { sender: user._id, receiver: to, content };
    socket.emit("sendMessage", msg);
    onSend(msg);
    setContent("");
  };

  return (
    <div>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}