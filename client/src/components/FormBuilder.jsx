import Button from "./Button"
import { Input } from "@nextui-org/react";
import { Select } from "@nextui-org/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  NUMBER: 'number',
  SELECT: 'select',
  DATE: 'date',
  TEXTAREA: 'textarea',
  LABEL: 'label',
  FILE: 'file',
  PASSWORD: 'password',
  BUTTON: 'button',
};

const TextInput = ({ field }) => (
    <div style={field.style}> 
    {field.label && <p style={{ marginRight:'90%', fontSize:'12px' }}>{field.label}</p>}
    <Input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      required={field.required}
      value={field.value}
      onChange={field.onChange}
      style={field.style}
    />
  </div>
);

const SelectInput = ({ field }) => (
    <div style={field.style}>
      {field.label && <p style={{ marginRight:'90%', fontSize:'12px' }}>{field.label}</p>}
      <Select
        placeholder={field.placeholder}
        onChange={field.onChange}
        value={field.value}
      >
        {field.options ? field.options.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        )) : null}
      </Select>
    </div>
);

const PasswordInput = ({ field }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label={field.label}
      variant="bordered"
      placeholder={field.placeholder}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-xs"
    />
  );
};

const Field = ({ field }) => {
  switch (field.type) {
    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.EMAIL:
    case FIELD_TYPES.NUMBER:
    case FIELD_TYPES.DATE:
    case FIELD_TYPES.TEXTAREA:
    case FIELD_TYPES.LABEL:
    case FIELD_TYPES.FILE:
      return <TextInput field={field} />;
    case FIELD_TYPES.PASSWORD:
      return <PasswordInput field={field} />;
    case FIELD_TYPES.BUTTON:
      return <Button text={field.label} onClick={field.onClick} className="bg-blue-500 hover:bg-blue-700 text-white
      font-bold py-2 px-4 rounded" style={{
        display: 'inline-block',
        width: '450px',
        padding: '10px 20px',
        margin: '15px 0',
        cursor: 'pointer'
      }} />;
      case FIELD_TYPES.SELECT:
        return <SelectInput field={field} />;
    default:
      return null;
  }
};

const FormBuilder = ({ fields }) => (
  <form className="space-y-4">
    {fields.map((field, index) => <Field key={index} field={field} />)}
  </form>
);

export default FormBuilder;