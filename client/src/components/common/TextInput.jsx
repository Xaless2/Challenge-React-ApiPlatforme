import { Input } from "@nextui-org/react";

const TextInput = ({ field }) => (
  <div className={`mb-4 ${field.style}`}>
    {field.label && <label htmlFor={field.name} className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>}
    <Input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      value={field.value}
      onChange={field.onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      id={field.name}
    />
  </div>
);

export default TextInput;
