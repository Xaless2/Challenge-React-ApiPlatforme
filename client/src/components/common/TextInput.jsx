import { Input } from "@nextui-org/react";

const TextInput = ({ field }) => (
  <div className={field.style}>
    {field.label && <p className="text-sm mb-1">{field.label}</p>}
    <Input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      value={field.value}
      onChange={field.onChange}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default TextInput;
