import expect from 'expect';
import documentReducer from '../../reducers/documentReducer';
import initialState from '../../reducers/initialState';
import * as documentActions from '../../actions/documentActions';
import { documents } from '../testHelper';

describe('Document Reducer', () => {
  it('should have a null initialState', () => {
    expect(initialState.documents).toEqual(null);
  });

  it('should add document when passed USER_DOCS', () => {
    const action = documentActions.getUserDocsSuccess(documents);

    const newState1 = documentReducer(initialState, action);

    expect(newState1[0].title).toEqual('test');
    expect(newState1[1].title).toEqual('test');
  });

  it('should fetch all documents when passed ALL_DOCS', () => {
    const action = documentActions.getAllDocsSuccess(documents);

    const newState = documentReducer(initialState, action);

    expect(newState).toEqual(documents);
    expect(newState.length).toEqual(2);
  });

  it('should return initialState when nothing is passed', () => {
    const initialState2 = documents;

    const docs = {};
    const action = documentActions.passSuccessMessage(docs);

    const newState = documentReducer(initialState2, action);

    expect(newState).toEqual(initialState2);
    expect(newState.length).toEqual(2);
  });
});
