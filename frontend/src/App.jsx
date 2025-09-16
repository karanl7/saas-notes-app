import { useState } from "react";
import Login from "./components/Login";
import Notes from "./components/Notes";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="font-sans">
      {user ? <Notes user={user} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
