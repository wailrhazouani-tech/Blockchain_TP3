// Inside your checkSign function:
const result = await contract.methods.estPositif(inputValue).call();
setIsPositif(result); // This will now store "positif", "negatif", or "nul"

// Inside your JSX for the result display:
{isPositif && (
  <div className={`mt-8 p-8 rounded-2xl border-2 text-center transition-all ${
    isPositif === 'positif' ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 
    isPositif === 'negatif' ? 'text-rose-500 bg-rose-50 border-rose-100' : 
    'text-slate-500 bg-slate-50 border-slate-100'
  }`}>
    <p className="text-[10px] uppercase font-black tracking-[0.2em] mb-1 opacity-70">Result</p>
    <p className="text-5xl font-black tracking-tighter capitalize">
      {isPositif}
    </p>
  </div>
)}