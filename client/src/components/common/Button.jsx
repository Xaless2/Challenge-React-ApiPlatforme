import {Button as NextButton} from "@nextui-org/react";

const Button = ({ onClick, text, type = 'button', style = {}, className = '' }) => {
    return (
      <NextButton 
        onClick={onClick} 
        type={type} 
        style={style}
        className={`bg-[#0ab3b3] hover:bg-[#088f9c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}>
        {text}
      </NextButton>
    );
  };
  
  export default Button;