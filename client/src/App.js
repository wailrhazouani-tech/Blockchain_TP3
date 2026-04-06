import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

// Layout Components
import Navbar from './components/Navbar';
import Home from './components/Home';

// Exercise Pages
import AdditionEx from './pages/AdditionEx';
import CryptoEx from './pages/CryptoEx';
// import StringsEx from './pages/StringsEx';
// import SignEx from './pages/SignEx';
// import ParityEx from './pages/ParityEx';
// import ArraysEx from './pages/ArraysEx';
// import RectangleEx from './pages/RectangleEx';
// import PaymentEx from './pages/PaymentEx';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  useEffect(() => {
  const init = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Listen for account changes in MetaMask
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount('');
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
    }
  };
  init();
}, []);



  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar account={account} setAccount={setAccount} />
        
        <main className="max-w-5xl mx-auto px-6 py-10">
          <Routes>
             <Route path="/" element={<Home />} />
            <Route path="/exercice-1" element={<AdditionEx web3={web3} account={account} />} />
            <Route path="/exercice-2" element={<CryptoEx web3={web3} account={account} />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;