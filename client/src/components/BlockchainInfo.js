import React, { useState, useEffect } from 'react';

const BlockchainInfo = ({ web3, account }) => {
  const [networkId, setNetworkId] = useState('...');
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    const getInfo = async () => {
      if (web3 && account) {
        const netId = await web3.eth.net.getId();
        const balWei = await web3.eth.getBalance(account);
        setNetworkId(netId);
        setBalance(web3.utils.fromWei(balWei, 'ether').substring(0, 7));
      }
    };
    getInfo();
  }, [web3, account]);

  return (
    <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-4 mb-6 flex items-center justify-between">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Network Status</p>
        <p className="text-sm font-medium text-green-600 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
          Connected (ID: {networkId}) 
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Balance & Account</p>
        <p className="text-xs font-mono text-slate-600">
          {balance} ETH | {account.substring(0, 6)}...{account.slice(-4)} 
        </p>
      </div>
    </div>
  );
};

export default BlockchainInfo;