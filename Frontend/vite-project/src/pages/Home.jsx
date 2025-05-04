import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import socket from "../socket";
import ChatBox from "../components/ChatBox";
import ContactList from "../components/ContactList";

export default function Home() {
  const { user } = useUser();
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (user) {
      socket.emit("join", user._id);
      axios.get(`http://localhost:5000/api/users/${user._id}/contacts`).then((res) => setContacts(res.data));
    }
  }, [user]);

  if (!user) return <p>Please login</p>;

  return (
    <div style={{ display: "flex" }}>
      <ContactList contacts={contacts} onSelect={setSelected} />
      {selected && <ChatBox selected={selected} />}
    </div>
  );
}