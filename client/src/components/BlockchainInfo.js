import React from 'react';

const BlockchainInfo = ({ web3, account }) => {
  // Safety Guard: Show loading state if account is not yet available
  if (!account) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="h-8 bg-slate-100 rounded w-3/4"></div>
      </div>
    );
  }

  // Formatting the address for the UI
  const displayAccount = account.length > 10 
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` 
    : account;

  // Determine if we are using MetaMask or Ganache Fallback
  const isMetaMask = window.ethereum && window.ethereum.isMetaMask && account;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {/* Account Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
        <div className="flex items-center space-x-2 mb-1">
          <span className={`w-2 h-2 rounded-full ${isMetaMask ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {isMetaMask ? "MetaMask Wallet" : "Local Node (Ganache)"}
          </p>
        </div>
        <p className="font-mono text-slate-700 font-bold break-all">
          {displayAccount}
        </p>
      </div>

      {/* Network Info Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
        <p className="text-emerald-600 font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          System Ready
        </p>
      </div>
    </div>
  );
};

export default BlockchainInfo;