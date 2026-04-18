import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentContract from '../contracts/PaymentContract.json';
import BlockchainInfo from '../components/BlockchainInfo';

const PaymentEx = ({ web3, account }) => {
  const [contract, setContract] = useState(null);
  const [balances, setBalances] = useState({ vault: '0', wallet: '0' });
  const [recipient, setRecipient] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHistory, setTxHistory] = useState([]);

  useEffect(() => {
    // ACCOUNT LISTENER: Detects when you switch accounts in MetaMask
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          // Force a reload to sync the new account across the whole app
          window.location.reload();
        }
      });
    }

    if (web3 && account) {
      const init = async () => {
        try {
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = PaymentContract.networks[networkId];
          if (deployedNetwork) {
            const instance = new web3.eth.Contract(PaymentContract.abi, deployedNetwork.address);
            setContract(instance);
            refreshUI(instance, account);
          }
        } catch (error) {
          console.error("Initialization failed", error);
        }
      };
      init();
    }
  }, [web3, account]);

  const refreshUI = async (instance, userAddr) => {
    const currentRec = await instance.methods.recipient().call();
    const vWei = await web3.eth.getBalance(instance.options.address);
    const wWei = await web3.eth.getBalance(userAddr);
    
    setRecipient(currentRec);
    setBalances({
      vault: web3.utils.fromWei(vWei, 'ether'),
      wallet: web3.utils.fromWei(wWei, 'ether')
    });
  };

  const handleDeposit = async () => {
    if (!contract || !amount) return;
    setLoading(true);
    try {
      const receipt = await contract.methods.receivePayment().send({ 
        from: account, 
        value: web3.utils.toWei(amount, 'ether') 
      });
      setTxHistory(prev => [{ hash: receipt.transactionHash, type: 'DEPOSIT', val: amount }, ...prev]);
      await refreshUI(contract, account);
      setAmount('');
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleUpdateRecipient = async () => {
    if (!contract || !newRecipient) return;
    setLoading(true);
    try {
      const receipt = await contract.methods.setRecipient(newRecipient).send({ from: account });
      setTxHistory(prev => [{ hash: receipt.transactionHash, type: 'UPDATE_REC', val: 'N/A' }, ...prev]);
      await refreshUI(contract, account);
      setNewRecipient('');
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    if (!contract) return;
    setLoading(true);
    try {
      const currentVault = balances.vault;
      const receipt = await contract.methods.withdraw().send({ from: account });
      setTxHistory(prev => [{ hash: receipt.transactionHash, type: 'WITHDRAW', val: currentVault }, ...prev]);
      await refreshUI(contract, account);
    } catch (err) {
      alert("Unauthorized: Only " + recipient + " can withdraw.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <Link to="/" className="text-sm font-bold text-slate-400 hover:text-indigo-600 transition">← Back</Link>
      <BlockchainInfo web3={web3} account={account} />

      {/* 1. BALANCES OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Wallet</p>
          <p className="text-3xl font-black text-emerald-400">{Number(balances.wallet).toFixed(4)} ETH</p>
          <p className="text-[10px] font-mono text-slate-500 mt-2 truncate">{account}</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border-2 border-indigo-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contract Vault</p>
          <p className="text-3xl font-black text-indigo-600">{balances.vault} ETH</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Recipient</p>
          <p className="text-xs font-mono text-slate-500 break-all mt-2">{recipient}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 2. DEPOSIT SECTION */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-6">Deposit Funds</h3>
          <div className="flex gap-3">
            <input type="number" step="0.1" className="flex-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono focus:border-indigo-400 outline-none" 
              placeholder="Amount (ETH)" value={amount} onChange={e => setAmount(e.target.value)} />
            <button onClick={handleDeposit} disabled={loading} className="px-8 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition">SEND</button>
          </div>
        </div>

        {/* 3. ADMIN & WITHDRAW SECTION */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-black text-slate-800 mb-2">Admin Controls</h3>
          
          <div className="flex gap-2">
            <input type="text" className="flex-1 p-4 bg-white border border-slate-200 rounded-xl text-xs font-mono" 
              placeholder="New Recipient (0x...)" value={newRecipient} onChange={e => setNewRecipient(e.target.value)} />
            <button onClick={handleUpdateRecipient} disabled={loading} className="px-4 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase">Update Recipient</button>
          </div>

          <button onClick={handleWithdraw} disabled={loading || balances.vault === '0'} 
            className={`w-full py-4 rounded-xl font-black text-white transition ${loading || balances.vault === '0' ? 'bg-slate-300' : 'bg-emerald-600 hover:bg-emerald-700 shadow-lg'}`}>
            {loading ? 'PROCESSING...' : 'WITHDRAW TO RECIPIENT'}
          </button>
        </div>
      </div>

      {/* 4. ACTIVITY HISTORY */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50 border-b border-slate-100 font-black text-[10px] text-slate-400 uppercase tracking-widest">Live Activity Ledger</div>
        {txHistory.length === 0 ? <p className="p-16 text-center text-slate-300 italic">No activity detected.</p> : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-50 text-[10px] text-slate-400 uppercase">
                <th className="p-4">Type</th>
                <th className="p-4">Hash</th>
                <th className="p-4 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {txHistory.map((tx, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition">
                  <td className="p-4"><span className={`px-2 py-1 rounded text-[10px] font-bold ${tx.type === 'DEPOSIT' ? 'bg-blue-100 text-blue-600' : tx.type === 'WITHDRAW' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>{tx.type}</span></td>
                  <td className="p-4 font-mono text-[10px] text-slate-400 truncate max-w-[250px]">{tx.hash}</td>
                  <td className="p-4 text-right font-black text-slate-700">{tx.val} {tx.val !== 'N/A' ? 'ETH' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentEx;