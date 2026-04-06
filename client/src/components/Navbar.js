import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ account, setAccount }) => {
  
  // Simulated Disconnect
  const handleDisconnect = () => {
    setAccount(''); // Clears the account from React State
    // Note: To fully disconnect, the user must revoke permissions in MetaMask settings.
  };

  // Trigger MetaMask Account Switcher
  const handleChangeAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.error("User cancelled account change");
      }
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-black bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          BLOCKCHAIN LAB
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {account ? (
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full pl-4 pr-1 py-1">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] uppercase text-slate-400 font-bold leading-none">Connected Wallet</p>
              <p className="text-xs font-mono text-slate-700">{account.substring(0, 6)}...{account.slice(-4)}</p>
            </div>
            
            {/* Change Account Button */}
            <button 
              onClick={handleChangeAccount}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full transition text-slate-500"
              title="Change Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="green" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="Vertical 8l-4-4m0 0l-4 4m4-4v12m8-12l-4-4m0 0l-4 4m4-4v12" />
              </svg>
            </button>

            {/* Disconnect Button */}
            <button 
              onClick={handleDisconnect}
              className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-red-100 transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button 
            onClick={() => window.location.reload()} 
            className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-700 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;