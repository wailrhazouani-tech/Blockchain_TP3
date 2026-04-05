import React from 'react';

const BlockchainInfo = ({ network, account, balance }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-6 border-l-4 border-blue-500">
    <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Blockchain Status</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <p className="text-xs text-gray-400">Network</p>
        <p className="font-mono text-sm">{network || "Connecting..."}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400">Active Account</p>
        <p className="font-mono text-sm truncate">{account || "Not Connected"}</p>
      </div>
      <div>
        <p className="text-xs text-gray-400">Balance</p>
        <p className="font-mono text-sm">{balance} ETH</p>
      </div>
    </div>
  </div>
);

export default BlockchainInfo;