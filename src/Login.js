import { useState } from "react";
import { USERS } from "./users";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    onLogin(username);
  };

  return (
    <form
  onSubmit={(e) => {
    e.preventDefault();
    login();
  }}
  style={{ padding: 40 }}
>
  <h2>Login</h2>

  <input
    placeholder="Username"
    onChange={(e) => setUsername(e.target.value)}
  />
  <br /><br />

  <input
    type="password"
    placeholder="Password"
    onChange={(e) => setPassword(e.target.value)}
  />
  <br /><br />

  <button type="submit">Login</button>
</form>
  );
}

export default Login;