import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

// Layout Components
import Navbar from './components/Navbar';
import Home from './components/Home';

// Exercise Pages
// import AdditionEx from './pages/AdditionEx';
// import CryptoEx from './pages/CryptoEx';
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
    const initWeb3 = async () => {
      // 1. Check if MetaMask is installed
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // 2. Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setWeb3(web3Instance);
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      } 
      // 3. Fallback to local Ganache if MetaMask isn't used
      else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };
    initWeb3();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar account={account} />
        
        <main className="max-w-5xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;