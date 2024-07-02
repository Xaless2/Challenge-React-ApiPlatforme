import React from 'react';

const Table = ({ data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Image</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Nom</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Date</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => ( // Ajoutez une vérification pour s'assurer que data est défini
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.date}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button 
                  onClick={() => onEdit(item.id)} 
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => onDelete(item.id)} 
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;