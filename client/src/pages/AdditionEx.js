import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import AdditionContract from '../contracts/AdditionContract.json';
import BlockchainInfo from '../components/BlockchainInfo';
import TransactionInfo from '../components/TransactionInfo';

const AdditionEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [stateVars, setStateVars] = useState({ n1: 0, n2: 0 });
  const [newVars, setNewVars] = useState({ n1: '', n2: '' });
  const [pureInputs, setPureInputs] = useState({ a: '', b: '' });
  const [result, setResult] = useState(null);
  const [lastTx, setLastTx] = useState({ hash: '', status: false });

  const loadState = async (instance) => {
    try {
      const n1 = await instance.methods.number1().call();
      const n2 = await instance.methods.number2().call();
      setStateVars({ n1, n2 });
    } catch (e) {
      console.error("Could not read state", e);
    }
  };

  useEffect(() => {
    if (web3) {
      const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = AdditionContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(AdditionContract.abi, deployedNetwork.address);
          setContract(instance);
          loadState(instance);
        }
      };
      init();
    }
  }, [web3]);

  const handleUpdateState = async () => {
    if (newVars.n1 === '' || newVars.n2 === '') return;
    try {
      const receipt = await contract.methods.setNumbers(newVars.n1, newVars.n2).send({ from: account });
      setLastTx({ hash: receipt.transactionHash, status: receipt.status });
      await loadState(contract);
    } catch (error) {
      console.error("Transaction failed", error);
    }
  };

  const handleStoredAddition = async () => {
    const res = await contract.methods.addition1().call();
    setResult({ type: 'Sum of Stored Variables', value: res });
  };

  const handlePureAddition = async () => {
    const res = await contract.methods.addition2(pureInputs.a, pureInputs.b).call();
    setResult({ type: 'Sum of Manual Inputs', value: res });
  };

  return (
    <div className="space-y-6">
      {/* 1. BACK BUTTON */}
      <div className="flex justify-start">
        <Link 
          to="/" 
          className="flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <BlockchainInfo account={account} />

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-4">Exercise 1: Addition & Setters</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SETTERS SECTION */}
          <div className="space-y-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Update Values</h3>
            <input 
              type="number" placeholder="New N1" 
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setNewVars({...newVars, n1: e.target.value})}
            />
            <input 
              type="number" placeholder="New N2" 
              className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setNewVars({...newVars, n2: e.target.value})}
            />
            <button onClick={handleUpdateState} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
              Update Blockchain
            </button>
          </div>

          {/* READ SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current State</h3>
            <div className="p-4 border border-indigo-100 rounded-xl bg-indigo-50/30">
              <p className="text-sm">N1: <span className="font-mono font-bold text-indigo-600">{stateVars.n1}</span></p>
              <p className="text-sm">N2: <span className="font-mono font-bold text-indigo-600">{stateVars.n2}</span></p>
            </div>
            <button onClick={handleStoredAddition} className="w-full border-2 border-indigo-600 text-indigo-600 py-2 rounded-lg font-bold hover:bg-indigo-50">
              Run addition1()
            </button>
          </div>

          {/* PURE SECTION */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pure Calculator</h3>
            <div className="flex gap-2">
              <input type="number" placeholder="A" className="w-1/2 p-2 border rounded-lg" onChange={(e)=>setPureInputs({...pureInputs, a: e.target.value})}/>
              <input type="number" placeholder="B" className="w-1/2 p-2 border rounded-lg" onChange={(e)=>setPureInputs({...pureInputs, b: e.target.value})}/>
            </div>
            <button onClick={handlePureAddition} className="w-full bg-slate-800 text-white py-2 rounded-lg font-bold hover:bg-slate-900">
              Run addition2()
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-indigo-900 text-white rounded-2xl flex justify-between items-center shadow-lg">
            <span className="text-indigo-300 font-medium">{result.type}</span>
            <span className="text-4xl font-black">{result.value}</span>
          </div>
        )}

        <TransactionInfo txHash={lastTx.hash} status={lastTx.status} />
      </div>
    </div>
  );
};

export default AdditionEx;