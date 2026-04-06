import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CryptoContract from '../contracts/CryptoConverterContract.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const CryptoEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [lastReceipt, setLastReceipt] = useState(null);

  useEffect(() => {
    if (web3) {
      const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = CryptoContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(
            CryptoContract.abi,
            deployedNetwork.address
          );
          setContract(instance);
        }
      };
      init();
    }
  }, [web3]);

  // Function: Convert ETH to WEI
  const handleToWei = async () => {
    if (!inputValue || !contract) return;
    try {
      // Since these are 'pure' functions, we use .call()
      const res = await contract.methods.etherEnWei(inputValue).call();
      setResult({
        input: inputValue,
        unit: 'ETH',
        output: res,
        targetUnit: 'Wei'
      });
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  // Function: Convert WEI to ETH
  const handleToEther = async () => {
    if (!inputValue || !contract) return;
    try {
      const res = await contract.methods.weiEnEther(inputValue).call();
      setResult({
        input: inputValue,
        unit: 'Wei',
        output: res,
        targetUnit: 'ETH'
      });
    } catch (error) {
      console.error("Conversion error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <div className="flex justify-start">
        <Link 
          to="/" 
          className="flex items-center text-sm font-semibold text-slate-500 hover:text-emerald-600 transition group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <BlockchainInfo web3={web3} account={account} />

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h2 className="text-2xl font-bold text-emerald-800">Exercise 2: Crypto Converter</h2>
          <p className="text-slate-500 text-sm mt-1">Convert between Ether and Wei using Smart Contract logic.</p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
              Enter Amount
            </label>
            <input 
              type="number" 
              placeholder="e.g. 1.5 or 1000000000" 
              className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl text-lg font-mono focus:ring-2 focus:ring-emerald-500 outline-none transition shadow-inner"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleToWei}
              className="bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 active:scale-95"
            >
              Convert to Wei
            </button>
            <button 
              onClick={handleToEther}
              className="bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition shadow-lg shadow-slate-200 active:scale-95"
            >
              Convert to Ether
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Result Details</p>
                  <p className="text-slate-600 font-medium">
                    {result.input} <span className="text-xs opacity-60 font-bold">{result.unit}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-emerald-700 break-all">
                    {result.output}
                  </p>
                  <p className="text-xs font-bold text-emerald-500">{result.targetUnit}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        
        <TransactionInfo txReceipt={lastReceipt} />
      </div>
    </div>
  );
};

export default CryptoEx;