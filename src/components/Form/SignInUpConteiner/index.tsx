import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { getDataUserSelector } from '../../../store/selectors';
import { changeSignConteiner } from '../../../store/signInUpSlice';
import { SignInForm } from '../SignInForm';
import { SignUpForm } from '../SignUpForm';

export const SignInUpConteiner = () => {
  const { signConteiner } = useAppSelector(getDataUserSelector);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changeSignConteiner(newValue));
  };

  return (
    <Box
      sx={{
        width: '300px',
        height: 'fit-content',
        typography: 'body1',
        margin: '0 auto',
        padding: 2,
        borderRadius: '6px',
        boxShadow: '0px 0px 8px 2px rgba(34, 60, 80, 0.5)',
        bgcolor: '#ffffff',
      }}
    >
      <TabContext value={signConteiner}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ width: '50%' }} label="SignIn" value="one" />
            <Tab sx={{ width: '50%' }} label="SignUp" value="two" />
          </TabList>
        </Box>
        <TabPanel value="one">
          <SignInForm />
        </TabPanel>
        <TabPanel value="two">
          <SignUpForm />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
