// import expect from 'expect';
// import React from 'react';
// import { mount, shallow } from 'enzyme';
// import DocumentForm from '../../components/document/DocumentForm.jsx';

// function setup(saving) {
//   const props = {
//     document: {},
//     saving,
//     roleId: '',
//     onSave: () => {},
//     onChange: () => {},
//     onEditorChange: () => {}
//   };

//   return shallow(<DocumentForm {...props} />);
// }

// describe('DocumentForm test via Enzyme', () => {
//   it('renders a form element', () => {
//     const wrapper = setup(false);
//     expect(wrapper.find('form').length).toBe(1);
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
