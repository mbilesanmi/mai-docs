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
    $('.tooltipped').tooltip({ delay: 50 });
    // $('.tooltipped').tooltip('remove');
  }

  componentWillMount() {
    // this.props.actions.getAllDocuments()
    // .then(() => {
    //   console.log('documents found');
    // })
    // .catch(() => {
    //   console.log('No documents found');
    //   // this.setState({ saving: false });
    //   // toastr.error(this.props.message);
    // });
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
            <div className="col l6 m6 s12">
              <h1>Sitewide Documents</h1>
            </div>
            <div className="col l5 m5 s12">
              <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
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
  documents: PropTypes.array,
  loggedInUserID: PropTypes.number
};

function mapStateToProps(state /* , ownProps*/) {
  // console.log('ownProps', ownProps);

  return {
    documents: state.documents || {},
    loggedInUserID: state.isAuth.loggedInUser.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
