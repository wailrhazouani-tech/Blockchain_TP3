import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArraysContract from '../contracts/ArraysContract.json';
import BlockchainInfo from '../components/BlockchainInfo';

const ArrayEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [newNum, setNewNum] = useState('');
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (web3) {
      const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ArraysContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(ArraysContract.abi, deployedNetwork.address);
          setContract(instance);
          fetchData(instance);
        }
      };
      init();
    }
  }, [web3]);

  const fetchData = async (instance) => {
    // Calling getArray()  and sumArray() 
    const currentArray = await instance.methods.getArray().call();
    const currentSum = await instance.methods.sumArray().call();
    setNumbers(currentArray);
    setTotalSum(currentSum);
  };

  const handleAdd = async () => {
    if (!contract || newNum === '') return;
    setLoading(true);
    try {
      // Sending a transaction to addNumber() 
      await contract.methods.addNumber(newNum).send({ from: account });
      setNewNum('');
      await fetchData(contract);
    } catch (error) {
      console.error("Blockchain transaction failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition">
        ← Back to Lab
      </Link>

      <BlockchainInfo web3={web3} account={account} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-xl font-black text-slate-800 mb-6">Array Controls</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                New Element (uint)
              </label>
              <input 
                type="number" 
                value={newNum}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-mono text-xl outline-none focus:border-purple-400 transition"
                placeholder="Enter number..."
                onChange={(e) => setNewNum(e.target.value)}
              />
            </div>
            <button 
              onClick={handleAdd}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition ${
                loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-purple-700 active:scale-95'
              }`}
            >
              {loading ? 'MINING...' : 'PUSH TO ARRAY'}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Calculated Sum</span>
              <span className="text-3xl font-black text-purple-600 tracking-tighter">
                {totalSum}
              </span>
            </div>
          </div>
        </div>

        {/* Data Display Card */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            Stored Numbers ({numbers.length})
          </h3>
          
          {numbers.length === 0 ? (
            <div className="py-20 text-center text-slate-300 italic">Array is empty</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {numbers.map((n, i) => (
                <div key={i} className="group relative bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center hover:border-purple-200 transition">
                  <span className="absolute top-2 left-2 text-[8px] font-bold text-slate-300 uppercase">
                    idx {i}
                  </span>
                  <p className="text-2xl font-black text-slate-700 group-hover:text-purple-600 transition">
                    {n}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayEx;