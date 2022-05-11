import { TextField } from '@mui/material';
import { FormikErrors } from 'formik';

type ILogin = {
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

export const Login = ({ onChange, name, value, error }: ILogin) => {
  return (
    <TextField
      label="Login"
      variant="outlined"
      type="text"
      name={name}
      onChange={onChange}
      value={value}
      error={Boolean(error.login)}
      helperText={error.login ? <div>{error.login}</div> : null}
    />
  );
};
