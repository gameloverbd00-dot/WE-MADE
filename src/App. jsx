import { useState, useEffect } from "react";

export default function App() {
  const [requests, setRequests] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("we_made_data");
    if (data) setRequests(JSON.parse(data));
  }, []);

  const save = (data) => {
    localStorage.setItem("we_made_data", JSON.stringify(data));
    setRequests(data);
  };

  // অ্যাডমিন নতুন এন্ট্রি করবে
  const addDeposit = () => {
    if (!userPhone || !amount) return alert("সবগুলো ঘর পূরণ করুন");
    const newData = [
      ...requests,
      {
        id: Date.now(),
        phone: userPhone,
        amount,
        status: "Confirmed",
        time: new Date().toLocaleString(),
      },
    ];
    save(newData);
    setUserPhone("");
    setAmount("");
    alert("সফলভাবে জমা হয়েছে!");
  };

  const login = () => {
    if (password === "ifty123") setAdmin(true); // এখানে আপনার পছন্দের পাসওয়ার্ড দিন
    else alert("ভুল পাসওয়ার্ড");
  };

  // মেম্বাররা শুধু তাদের ডাটা ফিল্টার করে দেখবে
  const memberData = requests.filter((r) => r.phone === searchPhone);

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>🌐 WE MADE সমিতি</h2>
      <hr />

      {!admin ? (
        <>
          {/* মেম্বার সেকশন */}
          <h3>সদস্য প্যানেল (নিজের হিসাব দেখুন)</h3>
          <input
            placeholder="আপনার মোবাইল নম্বর দিন"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            style={{ width: "90%", padding: 10, marginBottom: 10 }}
          />
          
          {searchPhone && memberData.length > 0 ? (
            memberData.map((d) => (
              <div key={d.id} style={{ border: "1px solid green", padding: 10, marginTop: 5 }}>
                <p>💰 পরিমাণ: {d.amount} টাকা</p>
                <p>🕒 তারিখ: {d.time}</p>
                <p>✅ স্ট্যাটাস: {d.status}</p>
              </div>
            ))
          ) : searchPhone ? (
            <p>এই নম্বরে কোনো তথ্য পাওয়া যায়নি।</p>
          ) : null}

          <hr style={{ marginTop: 40 }} />
          <h3>অ্যাডমিন লগইন</h3>
          <input
            type="password"
            placeholder="অ্যাডমিন পাসওয়ার্ড"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "90%", padding: 10, marginBottom: 10 }}
          />
          <button onClick={login} style={{ width: "100%", padding: 10, cursor: "pointer" }}>লগইন</button>
        </>
      ) : (
        <>
          {/* অ্যাডমিন সেকশন - শুধু আপনি ক্যাশ এন্ট্রি করবেন */}
          <h3>অ্যাডমিন ড্যাশবোর্ড (ক্যাশ এন্ট্রি)</h3>
          <button onClick={() => setAdmin(false)}>লগআউট</button>
          
          <div style={{ marginTop: 20, background: "#f0f0f0", padding: 15 }}>
            <h4>নতুন জমা যোগ করুন</h4>
            <input
              placeholder="সদস্যের ফোন নম্বর"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              style={{ width: "90%", padding: 8, marginBottom: 10 }}
            />
            <input
              placeholder="টাকার পরিমাণ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "90%", padding: 8, marginBottom: 10 }}
            />
            <button onClick={addDeposit} style={{ background: "green", color: "white", padding: 10 }}>জমা নিশ্চিত করুন</button>
          </div>

          <h4>সর্বশেষ এন্ট্রিগুলো:</h4>
          {requests.map((r) => (
            <p key={r.id} style={{ fontSize: "12px" }}>📱 {r.phone} - 💰 {r.amount} টাকা ({r.time})</p>
          ))}
        </>
      )}
    </div>
  );
}
