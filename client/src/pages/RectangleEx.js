import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RectangleContract from '../contracts/RectangleContract.json';
import BlockchainInfo from '../components/BlockchainInfo';

const RectangleEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [rectData, setRectData] = useState({ x: 0, y: 0, lo: 0, la: 0, surface: 0, info: '' });
  const [move, setMove] = useState({ dx: '', dy: '' });
  const [dims, setDims] = useState({ newLo: '', newLa: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (web3) {
      const init = async () => {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = RectangleContract.networks[networkId];
        if (deployedNetwork) {
          const instance = new web3.eth.Contract(RectangleContract.abi, deployedNetwork.address);
          setContract(instance);
          fetchRectangleData(instance);
        }
      };
      init();
    }
  }, [web3]);

  const fetchRectangleData = async (instance) => {
    const pos = await instance.methods.afficheXY().call();
    const size = await instance.methods.afficheLoLa().call();
    const area = await instance.methods.surface().call();
    const info = await instance.methods.afficheInfos().call();
    
    setRectData({
      x: pos[0], y: pos[1],
      lo: size[0], la: size[1],
      surface: area,
      info: info
    });
  };

  const handleChangeDimensions = async () => {
    if (!contract || dims.newLo === '' || dims.newLa === '') return;
    setLoading(true);
    try {
      await contract.methods.changeDimensions(dims.newLo, dims.newLa).send({ from: account });
      await fetchRectangleData(contract);
      setDims({ newLo: '', newLa: '' });
    } catch (error) {
      console.error("Update failed", error);
    }
    setLoading(false);
  };

  const handleMove = async () => {
    if (!contract || move.dx === '' || move.dy === '') return;
    setLoading(true);
    try {
      await contract.methods.deplacerForme(move.dx, move.dy).send({ from: account });
      await fetchRectangleData(contract);
      setMove({ dx: '', dy: '' });
    } catch (error) {
      console.error("Move failed", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Link to="/" className="text-sm font-bold text-slate-400 hover:text-purple-600 transition">← Back</Link>
      <BlockchainInfo web3={web3} account={account} />

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rectangle Stats Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest mb-1">Status</p>
          <h2 className="text-3xl font-black text-slate-800 mb-6">{rectData.info}</h2>

          <div className="bg-slate-900 rounded-2xl p-6 text-center text-white mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Surface Area</p>
            <p className="text-5xl font-black text-purple-400">{rectData.surface}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Position (X, Y)</span>
              <p className="text-xl font-bold text-slate-700">{rectData.x}, {rectData.y}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Size (L × W)</span>
              <p className="text-xl font-bold text-slate-700">{rectData.lo} × {rectData.la}</p>
            </div>
          </div>
        </div>

        {/* Controls Card */}
        <div className="space-y-6">
          {/* Resize Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-4 font-mono text-center">changeDimensions()</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input 
                type="number" placeholder="New Length" 
                className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-purple-400 transition"
                value={dims.newLo} onChange={(e) => setDims({...dims, newLo: e.target.value})}
              />
              <input 
                type="number" placeholder="New Width" 
                className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-purple-400 transition"
                value={dims.newLa} onChange={(e) => setDims({...dims, newLa: e.target.value})}
              />
            </div>
            <button 
              onClick={handleChangeDimensions} disabled={loading}
              className="w-full py-4 rounded-xl font-black text-white bg-purple-600 hover:bg-purple-700 transition shadow-lg"
            >
              UPDATE DIMENSIONS
            </button>
          </div>

          {/* Move Section */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-4 font-mono text-center">deplacerForme()</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input 
                type="number" placeholder="Set X" 
                className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-purple-400 transition"
                value={move.dx} onChange={(e) => setMove({...move, dx: e.target.value})}
              />
              <input 
                type="number" placeholder="Set Y" 
                className="p-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none focus:border-purple-400 transition"
                value={move.dy} onChange={(e) => setMove({...move, dy: e.target.value})}
              />
            </div>
            <button 
              onClick={handleMove} disabled={loading}
              className="w-full py-4 rounded-xl font-black text-white bg-slate-900 hover:bg-slate-800 transition shadow-lg"
            >
              MOVE POSITION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RectangleEx;