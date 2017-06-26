import React from 'react';
import sinon from 'sinon';
import expect from 'expect';
import { shallow, mount, render } from 'enzyme';
import Sidebar from '../../components/common/Sidebar.jsx';

function setup(isAuth) {
  const props = {
    search: () => {},
    clearSearch: () => {},
    updateSearchState: () => {},
    userDetails: {}
  };

  return shallow(<Sidebar {...props} />);
}

describe('The Sidebar', () => {
  describe(' component <Sidebar />', () => {
    let component;
    beforeEach(() => {
      component = shallow(<Sidebar />);
    });

    it('should render once', () => {
      expect(component.length).toBe(1);
    });
  });
});
