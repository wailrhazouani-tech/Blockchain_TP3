import React from 'react';

const TransactionInfo = ({ txHash, status }) => {
  if (!txHash) return null;

  return (
    <div className="mt-6 bg-slate-900 rounded-xl p-4 overflow-hidden border border-slate-800">
      <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 tracking-widest">Recent Transaction</p>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-mono text-blue-400 truncate">
          <span className="text-slate-500 italic">Hash:</span> {txHash}
        </p>
        <p className={`text-xs font-bold ${status ? 'text-green-400' : 'text-red-400'}`}>
          Status: {status ? "CONFIRMED" : "FAILED"}
        </p>
      </div>
    </div>
  );
};

export default TransactionInfo;