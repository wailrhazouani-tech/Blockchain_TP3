const TransactionInfo = ({ txReceipt }) => {
  if (!txReceipt) return null;

  return (
    <div className="mt-6 bg-slate-900 rounded-xl p-5 border border-slate-800 text-white">
      <h3 className="text-[10px] uppercase font-bold text-indigo-400 mb-4 tracking-widest">Live Transaction Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-[11px]">
        <div className="space-y-1 text-slate-300">
          <p><span className="text-slate-500">TX Hash:</span> <span className="text-blue-400">{txReceipt.transactionHash.substring(0, 20)}...</span></p>
          <p><span className="text-slate-500">Block Number:</span> {txReceipt.blockNumber}</p>
          <p><span className="text-slate-500">Gas Used:</span> {txReceipt.gasUsed}</p>
        </div>
        <div className="space-y-1 text-slate-300 border-l border-slate-800 pl-4">
          <p><span className="text-slate-500">Status:</span> {txReceipt.status ? "Success" : "Failed"}</p>
          <p><span className="text-slate-500">From:</span> {txReceipt.from.substring(0, 15)}...</p>
          <p><span className="text-slate-500">To:</span> {txReceipt.to.substring(0, 15)}...</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;