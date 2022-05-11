import { TextField } from '@mui/material';

type IPropsTextField = {
  type: string;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | undefined;
};

export const FormTextField = ({ type, label, name, onChange, error }: IPropsTextField) => {
  return (
    <TextField
      variant="outlined"
      type={type}
      label={label}
      name={name}
      onChange={onChange}
      helperText={error}
    />
  );
};
