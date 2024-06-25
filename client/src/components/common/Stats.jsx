import React, { useEffect, useState } from 'react';
import UserList from './UserList';

const Stats = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans localStorage
        const response = await fetch('http://localhost:8000/api/establishments/users', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nombre de clients</h3>
          <p className="text-2xl">{clients.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nombre de reservations</h3>
          <p className="text-2xl">120</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nombre de coachs</h3>
          <p className="text-2xl">30</p>
        </div>
        <div className="p-4 bg-red-100 rounded-lg">
          <h3 className="text-xl font-semibold">Revenus</h3>
          <p className="text-2xl">€4500</p>
        </div>
      </div>
      <UserList users={clients} />
    </div>
  );
};

export default Stats;
