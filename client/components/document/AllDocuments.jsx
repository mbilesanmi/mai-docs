import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentList from '../document/DocumentList.jsx';

class AllDocuments extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      documents: [],
    };
  }

  componentWillMount() {
    this.props.actions.getAllDocuments();
  }

  render() {
    const { documents } = this.props;
    return (
      <div>
        <h1>All Documents</h1>
        <DocumentList documents={documents} />
      </div>
    );
  }
}

AllDocuments.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  console.log('state', state);
  return {
    documents: state.documents
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
