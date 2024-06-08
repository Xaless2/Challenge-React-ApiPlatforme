import { Select } from "@nextui-org/react";

const SelectInput = ({ field }) => (
  <div className={field.style}>
    {field.label && <p className="text-sm mb-1">{field.label}</p>}
    <Select
      placeholder={field.placeholder}
      onChange={field.onChange}
      value={field.value}
      className="w-full p-2 border rounded"
    >
      {field.options && field.options.map((option, index) => (
        <Select.Option key={index} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  </div>
);

export default SelectInput;
