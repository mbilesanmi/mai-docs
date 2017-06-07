import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentList from './DocumentList.jsx';

class AllDocuments extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);

    this.state = {
      documents: [],
    };
  }

  componentDidMount() {
    // $('.tooltipped').tooltip({ delay: 50 });
    $('.tooltipped').tooltip('remove');
  }

  componentWillMount() {
    this.props.actions.getAllDocuments();
  }

  redirectToManageDocument() {
    browserHistory.push('/document');
  }

  render() {
    const { documents } = this.props;
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col l11 m11 s11">
              <h1>All Public Documents</h1>
            </div>
            <div className="col l1 m1 s1">
              <a
                onClick={this.redirectToManageDocument}
                data-position="left"
                data-delay="50"
                data-tooltip="Add document"
                className="btn btn-floating blue tooltipped">
                <i className="material-icons">add</i>
              </a>
            </div>
          </div>
          <DocumentList loggedInUserID={this.props.loggedInUserID} documents={documents} />
        </div>
      </div>
    );
  }
}

AllDocuments.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  loggedInUserID: PropTypes.number
};

function mapStateToProps(state /* , ownProps*/) {
  // console.log('ownProps', ownProps);

  return {
    documents: state.documents,
    loggedInUserID: state.isAuth.loggedInUser.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
