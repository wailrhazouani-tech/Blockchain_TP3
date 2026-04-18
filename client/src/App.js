import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import Navbar from './components/Navbar';
import Home from './components/Home';

// Page Imports
import AdditionEx from './pages/AdditionEx';
import CryptoEx from './pages/CryptoEx';
import StringsEx from './pages/StringsEx';
import PositifEx from './pages/PositifEx';
import EvenEx from './pages/EvenEx';
import ArrayEx from './pages/ArrayEx';
import RectangleEx from './pages/RectangleEx';
import PaymentEx from './pages/PaymentEx'; 

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  const initWeb3 = async () => {
    let web3Instance;

    // 1. Try MetaMask first
    if (window.ethereum) {
      web3Instance = new Web3(window.ethereum);
      try {
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
        
        // Listeners for MetaMask account/network changes
        window.ethereum.on('accountsChanged', (accs) => setAccount(accs[0] || ''));
        window.ethereum.on('chainChanged', () => window.location.reload());
      } catch (err) {
        console.warn("MetaMask access denied, switching to Ganache...");
      }
    } 
    
    // 2. Fallback: Connect directly to your Podman Ganache container
    if (!web3Instance || !account) {
      // Use localhost:7545 because your browser is on the host Fedora system
      const localProvider = new Web3.providers.HttpProvider("http://localhost:7545");
      web3Instance = new Web3(localProvider);
      try {
        const localAccounts = await web3Instance.eth.getAccounts();
        if (localAccounts.length > 0) {
          setAccount(localAccounts[0]);
          console.log("Connected to Ganache: ", localAccounts[0]);
        }
      } catch (e) {
        console.error("Ganache connection failed. Make sure Podman is running.", e);
      }
    }

    setWeb3(web3Instance);
  };

  useEffect(() => {
    initWeb3();
  }, []);

  const connectWallet = async () => {
  if (window.ethereum) {
    try {
      // 1. Force the MetaMask account selection popup
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      });

      // 2. After user selects accounts, get the current one
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setAccount(accounts[0]);
    } catch (error) {
      if (error.code === 4001) {
        console.log("User rejected the request.");
      } else {
        console.error("Connection error:", error);
      }
    }
  } else {
    alert("MetaMask not found. Please install the extension.");
  }
};

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar 
          account={account} 
          connectWallet={connectWallet} 
          setAccount={setAccount}
        />
        
        <main className="max-w-7xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercice-1" element={<AdditionEx web3={web3} account={account} />} />
            <Route path="/exercice-2" element={<CryptoEx web3={web3} account={account} />} />
            <Route path="/exercice-3" element={<StringsEx web3={web3} account={account} />} />
            <Route path="/exercice-4" element={<PositifEx web3={web3} account={account} />} />
            <Route path="/exercice-5" element={<EvenEx web3={web3} account={account} />} />
            <Route path="/exercice-6" element={<ArrayEx web3={web3} account={account} />} />
            <Route path="/exercice-7" element={<RectangleEx web3={web3} account={account} />} />
            <Route path="/exercice-8" element={<PaymentEx web3={web3} account={account} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;