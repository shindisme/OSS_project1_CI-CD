import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Loading...");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.message || "Backend đã kết nối");
        setTime(data.time);
      })
      .catch(() => {
        setError("Không thể kết nối với Backend!");
      });
  }, []);

  return (
    <div className="container">
      <h1>🚀 CI/CD Demo Project</h1>

      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p className="success"> Frontend đang chạy</p>
          <div className="card">
            <p><b>Backend status:</b></p>
            <p>{status}</p>

            <p><b>Server time:</b></p>
            <p>{time}</p>
          </div>
        </>
      )}

      <footer>
        <p>React + Vite • Node + Express • PostgreSQL</p>
        <p>Vercel • Render</p>
      </footer>
    </div>
  );
}

export default App;
