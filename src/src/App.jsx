import { useState, useEffect } from "react";

export default function App() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [requests, setRequests] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");

  // load data
  useEffect(() => {
    const data = localStorage.getItem("we_made");
    if (data) setRequests(JSON.parse(data));
  }, []);

  // save data
  const save = (data) => {
    localStorage.setItem("we_made", JSON.stringify(data));
    setRequests(data);
  };

  // send request
  const sendRequest = () => {
    if (!phone || !amount) return alert("Fill all fields");

    const newData = [
      ...requests,
      {
        id: Date.now(),
        phone,
        amount,
        status: "pending",
        time: new Date().toLocaleString(),
      },
    ];

    save(newData);
    setPhone("");
    setAmount("");
  };

  // login
  const login = () => {
    if (password === "admin123") setAdmin(true);
    else alert("Wrong password");
  };

  // update status
  const updateStatus = (id, status) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status } : r
    );
    save(updated);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>🌐 WE MADE</h2>
      <p>Simple Request System</p>

      {!admin ? (
        <>
          <h3>User Panel</h3>

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button onClick={sendRequest}>Send Request</button>

          <hr />

          <h3>Admin Login</h3>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h3>Admin Panel</h3>

          {requests.length === 0 && <p>No requests yet</p>}

          {requests.map((r) => (
            <div
              key={r.id}
              style={{ border: "1px solid black", margin: 5, padding: 5 }}
            >
              <p>📱 {r.phone}</p>
              <p>💰 {r.amount}</p>
              <p>🕒 {r.time}</p>
              <p>Status: {r.status}</p>

              <button onClick={() => updateStatus(r.id, "approved")}>
                Approve
              </button>

              <button onClick={() => updateStatus(r.id, "rejected")}>
                Reject
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
