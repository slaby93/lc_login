import React from 'react';
import { prop } from 'styled-tools';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/elements/Button';

export const Dashboard = ({
  className,
  onLogout,
}) => {
  return (
    <div className={className} >
      <Button onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

Dashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

const StyledComponent = styled(Dashboard)`
  width: 100%;
  background-color: ${prop('theme.color.purple')};
  display: flex;
  justify-content: center;

  ${Button}{
    align-self: flex-start;
    margin-top: 15%;
  }
`;

export default StyledComponent;
