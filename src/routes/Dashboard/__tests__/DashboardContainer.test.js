import React from 'react';
import { shallow } from 'enzyme';
import { DashboardContainer, mapDispatchToProps } from './../DashboardContainer';

jest.mock('./../Dashboard');

describe('<DashboardContainer />', () => {
  test('basic render', () => {
    const mountedComponent = shallow(<DashboardContainer />);
    expect(mountedComponent).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    const dispatch = jest.fn();

    test('result shape', () => {
      dispatch.mockReset();
      const result = mapDispatchToProps(dispatch);
      expect(result).toMatchSnapshot();
    });

    test('onLogout', () => {
      dispatch.mockReset();
      const result = mapDispatchToProps(dispatch);
      result.onLogout();
      expect(dispatch).toBeCalledWith({ type: 'USER/LOGOUT' });
    });
  });
});
