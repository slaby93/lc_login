import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import theme from 'themes/default';

export class GlobalWrapper extends React.Component {
  componentDidMount() {
    const { loadTokenToRedux } = this.props;
    loadTokenToRedux();
  }

  render() {
    const { className, children } = this.props;

    return (
      <div className={className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </div>
    );
  }
}

GlobalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  loadTokenToRedux: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

const Styled = styled(GlobalWrapper)`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

export default Styled;
