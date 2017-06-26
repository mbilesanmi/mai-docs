// import React from 'react';
// import { shallow } from 'enzyme';
// import expect from 'expect';
// import { AllDocuments } from '../../components/document/AllDocuments.jsx';

// const setup = (documents) => {
//   const props = {
//     documents,
//     userId: 1,
//     router: () => {}
//   };
//   return shallow(<AllDocuments {...props} />);
// };


// describe('AllDocuments Component', () => {
//   const documents = [
//     { title: 'A' },
//     { title: 'B' },
//     { title: 'C' }
//   ];
//   const wrapper = setup(documents);

//   it('should exists', () => {
//     expect(wrapper).toExist();
//   });

//   it('has a class name of `document__list`', () => {
//     const actual = wrapper.find('.document__list').exists();
//     const expected = true;
//     expect(wrapper.find('.responsive')).toExist();
//   });
// });
