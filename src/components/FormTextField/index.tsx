import { TextField } from '@mui/material';

type IPropsTextField = {
  type: string;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error: string | undefined;
  value: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
};

export const FormTextField = ({
  type,
  label,
  name,
  onChange,
  error,
  value,
  multiline = false,
  rows = 1,
  disabled = false,
}: IPropsTextField) => {
  return (
    <TextField
      sx={{ width: '100%', bgcolor: '#ffffff' }}
      multiline={multiline}
      rows={rows}
      variant="outlined"
      type={type}
      label={label}
      name={name}
      disabled={disabled}
      onChange={onChange}
      helperText={error || ' '}
      value={value}
      error={Boolean(error)}
    />
  );
};
