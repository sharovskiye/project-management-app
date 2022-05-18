import { Link } from 'react-router-dom';

import { CustomButton } from '../../../Design/Buttons/CustomButton';
import { ClassType } from '../../../Design/Buttons/CustomButton';

export const UpToMain = () => {
  return (
    <Link to="/main">
      <CustomButton textContent="Go to Main Page" classType={ClassType.icon} />
    </Link>
  );
};
