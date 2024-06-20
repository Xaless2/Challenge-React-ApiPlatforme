const FileInput = ({ field }) => (
    <div className={field.style}>
      {field.label && <p className="text-sm mb-1">{field.label}</p>}
      <input
        type="file"
        name={field.name}
        required={field.required}
        onChange={field.onChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
  
  export default FileInput;
  