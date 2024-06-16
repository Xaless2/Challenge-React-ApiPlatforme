import React from 'react';

const Stats = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nombre d'utilisateurs</h3>
          <p className="text-2xl">150</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nombre de ventes</h3>
          <p className="text-2xl">120</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nouveaux abonnés</h3>
          <p className="text-2xl">30</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg">
          <h3 className="text-xl font-semibold">Revenus</h3>
          <p className="text-2xl">€4500</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
