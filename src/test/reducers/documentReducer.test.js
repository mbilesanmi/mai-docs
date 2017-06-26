import expect from 'expect';
import documentReducer from '../../reducers/documentReducer';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';

describe('Document Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.documents).toEqual(null);
  });

  it('should add document when passed USER_DOCS', () => {
    const docs = [
      { title: 'A' },
      { title: 'B' }
    ];

    // const initialState = { title: 'C' };

    const action = documentActions.getUserDocsSuccess(docs);

    const newState1 = documentReducer(initialState, action);

    // expect(newState1.length).toEqual(3);
    expect(newState1[0].title).toEqual('A');
    expect(newState1[1].title).toEqual('B');
  });

  it('should fetch all documents when passed ALL_DOCS', () => {
    const docs = [
      { id: 'A', title: 'A' },
      { id: 'B', title: 'B' },
      { id: 'C', title: 'C' }
    ];

    // const initialState3 = {};
    const action = documentActions.getAllDocsSuccess(docs);

    const newState = documentReducer(initialState, action);

    expect(newState).toEqual(docs);
    expect(newState.length).toEqual(3);
  });

  it('should return initialState when nothing is passed', () => {
    const initialState2 = [
      { id: 'A', title: 'A' },
      { id: 'B', title: 'B' },
      { id: 'C', title: 'C' }
    ];

    const docs = {};
    const action = documentActions.passSuccessMessage(docs);

    const newState = documentReducer(initialState2, action);

    expect(newState).toEqual(initialState2);
    expect(newState.length).toEqual(3);
  });
});
