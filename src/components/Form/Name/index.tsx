import { TextField } from '@mui/material';
import { FormikErrors } from 'formik';

type IName = {
  onChange: {
    (e: React.ChangeEvent<HTMLInputElement>): void;
    <T_1 = string | React.ChangeEvent<HTMLInputElement>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<HTMLInputElement>
      ? void
      : (e: string | React.ChangeEvent<HTMLInputElement>) => void;
  };
  name: string;
  value: string;
  error: FormikErrors<{
    name: string;
    login: string;
    password: string;
  }>;
};

export const Name = ({ onChange, name, value, error }: IName) => {
  return (
    <TextField
      id="outlined-basic"
      label="Name"
      variant="outlined"
      type="text"
      name={name}
      onChange={onChange}
      value={value}
      error={Boolean(error.name)}
      helperText={error.name ? <div>{error.name}</div> : null}
    />
  );
};
