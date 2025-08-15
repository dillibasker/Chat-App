import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    const { data } = await axios.post("http://localhost:5000/api/auth/login", { phone });
    setUser(data);
    console.log("setted data");
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}