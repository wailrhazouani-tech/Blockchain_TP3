import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StringsContract from '../contracts/GestionChainesContract.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const StringsEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [currentMsg, setCurrentMsg] = useState('...');
  const [inputs, setInputs] = useState({ newMsg: '', concatA: '', concatB: '' });
  const [lastReceipt, setLastReceipt] = useState(null);
  const [concatResult, setConcatResult] = useState('');

  const loadData = async (instance) => {
    try {
      const msg = await instance.methods.getMessage().call();
      setCurrentMsg(msg || "No message stored yet.");
    } catch (e) {
      console.error("Error loading string state", e);
    }
  };

  useEffect(() => {
    if (web3) {
      const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = StringsContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(StringsContract.abi, deployedNetwork.address);
          setContract(instance);
          loadData(instance);
        }
      };
      init();
    }
  }, [web3]);

  // SET MESSAGE: This is a Write operation (.send)
  const handleSetMessage = async () => {
    if (!inputs.newMsg || !contract) return;
    try {
      const receipt = await contract.methods.setMessage(inputs.newMsg).send({ from: account });
      setLastReceipt(receipt);
      await loadData(contract); // Refresh the UI
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  // CONCATENATE: This is a Read operation (.call)
  const handleConcatenate = async () => {
    if (!inputs.concatA || !inputs.concatB || !contract) return;
    try {
      const res = await contract.methods.concatener(inputs.concatA, inputs.concatB).call();
      setConcatResult(res);
    } catch (error) {
      console.error("Pure function error", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <Link to="/" className="flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <BlockchainInfo web3={web3} account={account} />

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-100 pb-4 mb-8">
          <h2 className="text-2xl font-bold text-blue-800">Exercise 3: String Management</h2>
          <p className="text-slate-500 text-sm mt-1">Manage global messages and test string concatenation.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* SECTION 1: STORAGE (STATE CHANGE) */}
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Stored on Blockchain</h3>
              <p className="text-xl font-medium text-blue-900 italic">"{currentMsg}"</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Update Message</label>
              <input 
                type="text" 
                placeholder="Type a new message..." 
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => setInputs({...inputs, newMsg: e.target.value})}
              />
              <button 
                onClick={handleSetMessage}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                Save to Blockchain
              </button>
            </div>
          </div>

          {/* SECTION 2: CONCATENATION (PURE LOGIC) */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">String Concatenation (Pure)</h3>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="text" placeholder="String A" 
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition"
                onChange={(e) => setInputs({...inputs, concatA: e.target.value})}
              />
              <input 
                type="text" placeholder="String B" 
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-slate-800 outline-none transition"
                onChange={(e) => setInputs({...inputs, concatB: e.target.value})}
              />
            </div>
            <button 
              onClick={handleConcatenate}
              className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition"
            >
              Test Concatenation
            </button>

            {concatResult && (
              <div className="p-4 bg-slate-100 rounded-xl border border-dashed border-slate-300 font-mono text-center text-slate-700">
                Result: <span className="font-bold">{concatResult}</span>
              </div>
            )}
          </div>
        </div>

        <TransactionInfo txReceipt={lastReceipt} />
      </div>
    </div>
  );
};

export default StringsEx;