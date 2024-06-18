import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import  PasswordInput from '../common/PasswordInput'; 
import Button from '../common/Button';
import FileInput from '../common/FileInput';

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

const Field = ({ field }) => {
  switch (field.type) {
    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.EMAIL:
    case FIELD_TYPES.NUMBER:
    case FIELD_TYPES.DATE:
    case FIELD_TYPES.TEXTAREA:
    case FIELD_TYPES.LABEL:
      return <TextInput field={field} />;
    case FIELD_TYPES.PASSWORD:
      return <PasswordInput field={field} />;
    case FIELD_TYPES.BUTTON:
      return (
        <Button 
          text={field.label} 
          style={field.style}
          onClick={field.onClick}
        />
      );
    case FIELD_TYPES.SELECT:
      return <SelectInput field={field} />;
    case FIELD_TYPES.FILE:
      return <FileInput field={field} />; 
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
