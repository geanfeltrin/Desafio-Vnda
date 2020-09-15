import React from 'react';
import Container from '@material-ui/core/Container';
import Topbar from '../../components/Topbar';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <>
      <Topbar />
      <Container maxWidth="lg">
        <>{children}</>
      </Container>
    </>
  );
};

export default DefaultLayout;
