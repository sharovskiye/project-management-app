import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getDataUserSelector } from '../../../store/selectors';
import { changeSignConteiner } from '../../../store/signInUpSlice';
import { SignInForm } from '../SignInForm';
import { SignUpForm } from '../SignUpForm';
import { BackButton } from '../../BackButton';

export const SignInUpConteiner = () => {
  const { signConteiner } = useAppSelector(getDataUserSelector);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changeSignConteiner(newValue));
  };

  const backToWelcomePage = () => {
    navigate('/');
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
      <div>
        <BackButton backTo={backToWelcomePage} title={'Back to welcome page'} />
      </div>
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
