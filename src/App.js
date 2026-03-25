import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <Dashboard username={user} />;
}

export default App;