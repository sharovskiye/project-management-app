import { TextField } from '@mui/material';

type IPropsTextField = {
  type: string;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | undefined;
  value: string;
};

export const FormTextField = ({ type, label, name, onChange, error, value }: IPropsTextField) => {
  return (
    <TextField
      sx={{ width: '100%', bgcolor: '#fff8dc' }}
      variant="outlined"
      type={type}
      label={label}
      name={name}
      onChange={onChange}
      helperText={error}
      value={value}
      error={Boolean(error)}
    />
  );
};
