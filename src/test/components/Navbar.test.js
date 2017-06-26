// import React from 'react';
// import sinon from 'sinon';
// import expect from 'expect';
// import { shallow, mount, render } from 'enzyme';
// import { Navbar } from '../../components/common/Navbar.jsx';

// function setup(roleId, isAuth) {
//   const props = {
//     router: {},
//     logout: () => {},
//     roleId
//   };

//   return mount(<Navbar {...props} />);
// }

// describe('The Navbar', () => {
//   describe(' component <Navbar />', () => {
//     let component;
//     beforeEach(() => {
//       component = shallow(<Navbar />);
//     });

//     it('should render once', () => {
//       expect(component.length).toBe(1);
//     });

//     it('renders text inputs for both loginId and password', () => {
//       const wrapper = setup();
//       expect(wrapper.find('nav').length).toEqual(1);
//       expect(wrapper.find('li').length).toEqual(6);
//       expect(wrapper.find('li').last().prop('id')).toBe('signup');
//     });
//   });
// });
