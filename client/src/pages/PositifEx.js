import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PositifNumberContract from '../contracts/PositifNumberContract.json';
import BlockchainInfo from '../components/BlockchainInfo';

const PositifEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (web3) {
      const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = PositifNumberContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(PositifNumberContract.abi, deployedNetwork.address);
          setContract(instance);
        }
      };
      init();
    }
  }, [web3]);

  const checkSign = async () => {
    if (!contract || inputValue === '') return;
    try {
      // Calling your function estPositif(int number) 
      const result = await contract.methods.estPositif(inputValue).call();
      setStatus(result);
    } catch (error) {
      console.error("Contract call failed", error);
    }
  };

  // Logic to determine the style based on the contract return value 
  const getStatusClasses = () => {
    switch (status) {
      case 'positif':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200'; // Green
      case 'negatif':
        return 'text-rose-600 bg-rose-50 border-rose-200';      // Red
      case 'nul':
        return 'text-slate-500 bg-slate-50 border-slate-200';   // Grey
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition">
        ← Back to Lab
      </Link>

      <BlockchainInfo web3={web3} account={account} />

      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-6 text-center">Number Sign Tester</h2>
        
        <div className="space-y-4">
          <input 
            type="number" 
            placeholder="Enter a number (positive, negative, or zero)..." 
            className="w-full p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 font-mono text-2xl focus:border-purple-400 outline-none transition"
            onChange={(e) => setInputValue(e.target.value)}
          />
          
          <button 
            onClick={checkSign}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-purple-700 transition shadow-lg active:scale-[0.98]"
          >
            RUN TEST
          </button>

          {status && (
            <div className={`mt-8 p-10 rounded-2xl border-2 text-center transition-all animate-in fade-in zoom-in duration-300 ${getStatusClasses()}`}>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-1 opacity-60">
                Classification
              </p>
              <p className="text-5xl font-black tracking-tighter capitalize">
                {status === 'nul' ? 'Zero' : status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PositifEx;