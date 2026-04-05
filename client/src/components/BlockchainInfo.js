import React from 'react';
import { Link } from 'react-router-dom';

const BlockchainInfo = ({ account }) => (
  
  <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-4 mb-6 flex items-center justify-between">
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Network Status</p>
      <p className="text-sm font-medium text-green-600 flex items-center gap-2">
        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
        Connected to Ganache (Localhost 7545)
      </p>
    </div>
    <div className="text-right">
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Your Account</p>
      <p className="text-xs font-mono text-slate-600">{account || "No account found"}</p>
    </div>
  </div>
  
);

export default BlockchainInfo;