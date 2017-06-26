// import React from 'react';
// import expect from 'expect';
// import { mount, shallow } from 'enzyme';
// import { ManageDocument } from '../../components/document/ManageDocument.jsx';

// function setup(saving) {
//   const props = {
//     authorId: [],
//     document: {
//       id: '',
//       title: '',
//       authorId: ''
//     },
//     message: ''
//   };

//   return shallow(<ManageDocument {...props} />);
// }

// describe('ManageDocument test via Enzyme', () => {
//   it('renders a form element', () => {
//     // const wrapper = mount(<ManageCoursePage {...props}/>);
//     const wrapper = setup();
//     const saveButton = wrapper.find('.saveDocument').last();
//     // expect(saveButton.prop('type')).toBe('submit');
//     // expect(wrapper.find('form').length).toBe(1);
//   });

//   it('renders a select box tag', () => {
//     const wrapper = setup(false);
//     expect(wrapper.find('select').length).toBe(1);
//   });

//   it('Save button is labeled "Save" when not saving', () => {
//     const wrapper = setup(false);
//     expect(wrapper.find('#saveDocument').props().value).toBe('Save');
//   });

//   it('Save button is labeled "Saving..." when saving', () => {
//     const wrapper = setup(true);
//     expect(wrapper.find('#saveDocument').props().value).toBe('Saving...');
//   });
// });
