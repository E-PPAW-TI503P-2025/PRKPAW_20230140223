import React, { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [serverMsg, setServerMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000') // atau fetch('/') jika kamu menggunakan "proxy" di package.json React
      .then(res => res.json())
      .then(data => setServerMsg(data.message))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h1>Integrasi React dan Node.js</h1>

      <div style={{ marginTop: 20 }}>
        <label htmlFor="name">Masukkan nama: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Irfansyah 223"
          style={{ padding: 6, marginLeft: 8 }}
        />
      </div>

      <h2 style={{ marginTop: 30 }}>
        {name ? `Hello, ${name}!` : 'Hello! Masukkan namamu di atas.'}
      </h2>

      <p style={{ marginTop: 20 }}>
        Pesan dari server: {serverMsg || ' (mengambil...)'}
      </p>
    </div>
  );
}

export default App;
