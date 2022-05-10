import { TextField } from '@mui/material';
import { FormikErrors } from 'formik';

type IPassword = {
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

export const Password = ({ onChange, name, value, error }: IPassword) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="text"
        name={name}
        onChange={onChange}
        value={value}
        error={Boolean(error.password)}
        helperText={error.password ? <div>{error.password}</div> : null}
      />
    </>
  );
};
