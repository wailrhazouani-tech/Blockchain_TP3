import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EvenContract from '../contracts/EvenContract.json';
import BlockchainInfo from '../components/BlockchainInfo';

const EvenEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isEven, setIsEven] = useState(null);

  useEffect(() => {
    if (web3) {
      const init = async () => {
        try {
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = EvenContract.networks[networkId];
          if (deployedNetwork) {
            const instance = new web3.eth.Contract(
              EvenContract.abi, 
              deployedNetwork.address
            );
            setContract(instance);
          }
        } catch (error) {
          console.error("Error loading EvenContract", error);
        }
      };
      init();
    }
  }, [web3]);

  const checkParity = async () => {
    if (!contract || inputValue === '') return;
    
    // Safety check for uint: prevent negative numbers from being sent to the contract
    if (parseInt(inputValue) < 0) {
      alert("This contract uses 'uint' and only accepts positive numbers.");
      return;
    }

    try {
      // Calling your specific function: isEven(uint number)
      const result = await contract.methods.isEven(inputValue).call();
      setIsEven(result);
    } catch (error) {
      console.error("Contract call failed", error);
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition">
        ← Back to Lab
      </Link>

      <BlockchainInfo web3={web3} account={account} />

      <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-6 text-center">Parity Checker</h2>
        
        <div className="space-y-4">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
            Input Number (uint)
          </label>
          <input 
            type="number" 
            min="0"
            placeholder="Enter a positive number..." 
            className="w-full p-5 border-2 border-slate-100 rounded-2xl bg-slate-50 font-mono text-2xl focus:border-purple-400 outline-none transition"
            onChange={(e) => setInputValue(e.target.value)}
          />
          
          <button 
            onClick={checkParity}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-600 transition shadow-lg active:scale-[0.98]"
          >
            CHECK PARITY
          </button>

          {isEven !== null && (
            <div className={`mt-8 p-10 rounded-2xl border-2 text-center transition-all animate-in fade-in zoom-in duration-300 ${
              isEven ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-rose-600 bg-rose-50 border-rose-200'
            }`}>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-1 opacity-60">
                The number is
              </p>
              <p className="text-5xl font-black tracking-tighter capitalize">
                {isEven ? 'EVEN' : 'ODD'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvenEx;