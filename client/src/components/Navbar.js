import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ account }) => (
  <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
      Blockchain dApp Lab
    </Link>
    <div className="flex items-center gap-4">
      <div className="hidden md:block text-right">
        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Connected Account</p>
        <p className="text-xs font-mono text-slate-600">{account || 'Disconnected'}</p>
      </div>
      <div className={`h-3 w-3 rounded-full ${account ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
    </div>
  </nav>
);

export default Navbar;