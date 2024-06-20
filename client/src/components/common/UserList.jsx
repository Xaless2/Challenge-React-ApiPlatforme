import React from 'react';

const UserList = ({ users }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Nom</th>
            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map(user => (
            <tr key={user.id}>
              <td className="w-1/3 text-left py-3 px-4">
                <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
              </td>
              <td className="w-1/3 text-left py-3 px-4">{user.name}</td>
              <td className="w-1/3 text-left py-3 px-4">{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
