import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ account, connectWallet, setAccount }) => {
  
  const handleDisconnect = () => {
    // This clears the local state so the app falls back to Ganache 
    // or allows the user to click "Connect" again for a different MetaMask account.
    setAccount('');
    console.log("Disconnected from app state.");
  };

  const shortAccount = account 
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` 
    : null;

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-xl font-black text-purple-700 tracking-tighter">
            BLOCKCHAIN<span className="text-slate-400">LAB</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {account ? (
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full pl-4 pr-1 py-1">
              <span className="text-xs font-mono font-bold text-slate-600 mr-3">
                {shortAccount}
              </span>
              <button 
                onClick={handleDisconnect}
                className="bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition shadow-sm"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-purple-700 transition shadow-md shadow-purple-100"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;