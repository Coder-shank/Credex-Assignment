import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/audit")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          AI Spend Audit
        </h1>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;