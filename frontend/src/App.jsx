import { useEffect, useState } from "react";

function App() {
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch(() => setBackendMessage("Backend not reachable"));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Meal & Grocery Planner (MVP)</h1>

      <div style={{ marginTop: "20px" }}>
        <h3>Backend Status:</h3>
        <p>{backendMessage}</p>
      </div>
    </div>
  );
}

export default App;
