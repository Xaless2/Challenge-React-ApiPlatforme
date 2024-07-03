import React, { useState } from 'react';

const Table = ({ data, onEdit, onDelete, onAddImage }) => {
  const [selectedFiles, setSelectedFiles] = useState({});
  const [showUploadFields, setShowUploadFields] = useState({});

  const handleFileChange = async (id, event) => {
    const files = event.target.files;
    const base64Files = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        base64Files.push(reader.result);
        if (base64Files.length === files.length) {
          setSelectedFiles(prevFiles => ({
            ...prevFiles,
            [id]: base64Files
          }));
        }
      };
    }
  };

  const handleUploadClick = (id) => {
    onAddImage(id, selectedFiles[id]);
    setSelectedFiles(prevFiles => ({
      ...prevFiles,
      [id]: undefined
    }));
    setShowUploadFields(prevState => ({
      ...prevState,
      [id]: false
    }));
  };

  const toggleUploadFields = (id) => {
    setShowUploadFields(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Image</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Nom</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200">
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => onEdit(item.id)}>Modifier</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => onDelete(item.id)}>Supprimer</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => toggleUploadFields(item.id)}>Importer un fichier</button>
                {showUploadFields[item.id] && (
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileChange(item.id, e)}
                      className="mb-2"
                    />
                    <input
                      type="file"
                      accept="application/pdf"
                      multiple
                      onChange={(e) => handleFileChange(item.id, e)}
                      className="mb-2"
                    />
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleUploadClick(item.id)}
                      disabled={!selectedFiles[item.id]}
                    >
                      Valider 
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;