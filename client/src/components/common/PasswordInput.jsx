import { Input } from "@nextui-org/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const PasswordInput = ({ field }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="relative">
      {field.label && <p className="text-sm mb-1">{field.label}</p>}
      <Input
        type={isVisible ? "text" : "password"}
        name={field.name}
        placeholder={field.placeholder}
        required={field.required}
        value={field.value}
        onChange={field.onChange}
        className="w-full p-2 border rounded"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-2 top-2 focus:outline-none"
      >
        {isVisible ? (
          <AiFillEye className="text-2xl text-gray-600" />
        ) : (
          <AiFillEyeInvisible className="text-2xl text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
