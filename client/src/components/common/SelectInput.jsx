const SelectInput = ({ field }) => (
  <div className={field.style}>
    {field.label && <p className="text-sm mb-1">{field.label}</p>}
    <select
      value={field.value}
      name={field.name}
      onChange={field.onChange}
      className="w-full p-2 border rounded"
    >
      <option value="" disabled>{field.placeholder}</option>
      {field.options && field.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;