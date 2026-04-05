import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const exercises = [
    { id: 1, title: "Sum of Two Variables", desc: "Basic arithmetic operations" },
    { id: 2, title: "Crypto Converter", desc: "Wei, Gwei, and Ether conversions" },
    { id: 3, title: "String Processing", desc: "Concatenation and length utilities" },
    { id: 4, title: "Number Sign Tester", desc: "Positive, Negative, or Zero logic" },
    { id: 5, title: "Parity Checker", desc: "Even or Odd calculation" },
    { id: 6, title: "Array Management", desc: "Storage and retrieval of lists" },
    { id: 7, title: "Geometry OOP", desc: "Inheritance with Rectangle.sol" },
    { id: 8, title: "Global Variables", desc: "Using msg.sender and msg.value" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800">Project Dashboard</h2>
        <p className="text-gray-600 mt-2">Select an exercise to test smart contract functionality</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {exercises.map((exo) => (
          <Link 
            key={exo.id} 
            to={`/exercice-${exo.id}`}
            className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Exercise {exo.id}</span>
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700">{exo.title}</h3>
                <p className="text-gray-500 mt-1">{exo.desc}</p>
              </div>
              <div className="text-gray-300 group-hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;