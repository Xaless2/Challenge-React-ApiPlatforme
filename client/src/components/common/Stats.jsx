import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import { baseUrl } from '../../utils/service';

const Stats = () => {
  const [clients, setClients] = useState([]);
  const [coachs, setCoachs] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientsAndCoachs = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response_establishments_users = await fetch(`${baseUrl}/establishments/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const response_reservations_count_by_admin = await fetch(`${baseUrl}/reservations/count-by-admin`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response_establishments_users.ok) {
          throw new Error(`HTTP error establishments' users ! Status: ${response_establishments_users.status}`);
        }

        if (!response_reservations_count_by_admin.ok) {
          throw new Error(`HTTP error reservation by admin ! Status: ${response_reservations_count_by_admin.status}`);
        }

        const data_establishments_users = await response_establishments_users.json();
        const data_reservations_count_by_admin = await response_reservations_count_by_admin.json();

        if (!data_establishments_users.clients || !data_establishments_users.coachs) {
          throw new Error('Invalid data_establishments_users format');
        }

        setClients(data_establishments_users.clients);
        setCoachs(data_establishments_users.coachs);
        setReservations(data_reservations_count_by_admin);
      } catch (error) {
        console.error('Error fetching data_establishments_users:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientsAndCoachs();
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
          <p className="text-2xl">{reservations.length}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <h3 className="text-xl font-semibold">Nombre de coachs</h3>
          <p className="text-2xl">{coachs.length}</p>
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