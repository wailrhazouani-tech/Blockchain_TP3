import React from 'react';

const TransactionInfo = ({ txHash, gasUsed, status }) => {
  if (!txHash) return null;
  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs mt-6 shadow-inner">
      <p className="mb-1 uppercase font-bold text-gray-500">Last Transaction Receipt</p>
      <p><span className="text-blue-400">Hash:</span> {txHash}</p>
      <p><span className="text-blue-400">Gas Used:</span> {gasUsed}</p>
      <p><span className="text-blue-400">Status:</span> {status ? "✅ Success" : "❌ Failed"}</p>
    </div>
  );
};

export default TransactionInfo;