import React from 'react';
import { shallow } from 'enzyme';
import Button from 'components/elements/Button';
import DashboardStyled, { Dashboard } from './../Dashboard';

describe('<Dashboard />', () => {
  test('CSS', () => {
    const mountedComponent = shallow(<DashboardStyled
      onLogout={jest.fn()}
    />);
    expect(mountedComponent).toMatchSnapshot();
  });

  test('HTML', () => {
    const mountedComponent = shallow(<Dashboard
      onLogout={jest.fn()}
      className="test"
    />);
    expect(mountedComponent).toMatchSnapshot();
  });

  test('Button click', () => {
    const onLogoutMock = jest.fn();
    const mountedComponent = shallow(<Dashboard
      onLogout={onLogoutMock}
      className="test"
    />);
    expect(onLogoutMock).not.toBeCalled();
    mountedComponent.find(Button).simulate('click');
    expect(onLogoutMock).toBeCalled();
  });
});
