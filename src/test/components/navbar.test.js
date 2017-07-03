// import React from 'react';
// import sinon, { spy } from 'sinon';
// import expect from 'expect';
// import { shallow, mount, render } from 'enzyme';
// import { Navbar } from '../../components/common/Navbar.jsx';

// let wrapper;

// /**
//  * @desc handles the triggering of the necessary action
//  * @param {*} isAuthenticated
//  * @returns {null} returns no value
//  */
// function setup(isAuthenticated) {
//   const props = {
//     isAuthenticated,
//     userActions: {
//       logout: spy(() => new Promise((resolve) => { resolve(); })),
//     },
//     message: ''
//   };

//   return mount(<Navbar {...props} />);
// }

// describe('The Navbar', () => {
//   describe('component <Navbar />', () => {
//     let component;

//     it('should exist', () => {
//       wrapper = setup(true);
//       expect(wrapper).toExist();
//     });

//     it('should exist', () => {
//       wrapper = setup(false);
//       expect(wrapper).toExist();
//     });

//     it('should submit the form when button is clicked', () => {
//       const logout = wrapper.find('li[id="signup"]');
//       logout.simulate('click', {
//         preventDefault: () => {
//         }
//       });
//       expect(wrapper.state().isLoading).toBeTruthy();
//     });

//     it('should submit the form when button is clicked', () => {
//       const confirmPassword = wrapper.find('input[name="confirmPassword"]');
//       confirmPassword.simulate('blur', {
//         target: { value: 'pass', name: 'confirmPassword' } });
//       const form = wrapper.find('form[id="signupForm"]');
//       form.simulate('submit', {
//         preventDefault: () => {
//         }
//       });
//       expect(wrapper.state().isLoading).toBeFalsy();
//     });
//   });
// });


// //
// //
// // WRITE TEST FOR MAPSTATETOPROPS && MAPDISPATCHTOPROPS
// //
// //
