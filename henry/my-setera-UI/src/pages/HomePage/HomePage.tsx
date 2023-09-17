import React from 'react';
import { useTranslation } from 'react-i18next';
type Props = {};
const HomePage = (props: Props) => {
  const { t } = useTranslation();
  return (
    <>{
      t('login_leftfColTitle')
    }
    
    </>
  );
};

export default HomePage;