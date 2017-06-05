import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentList from '../document/DocumentList.jsx';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    // this.updateUserState = this.updateUserState.bind(this);

    this.state = {
      documents: [],
      // user: Object.assign({}, props.user),
      // errors: {},
      // isLoading: false
    };
  }

  componentWillMount() {
    this.props.actions.getMyDocuments(this.props.ownerID);
  }

  render() {
    const { documents } = this.props;
    const currentUrlPath = this.props.location.pathname;
    console.log('props1', currentUrlPath);
    return (
      <div className="section">
        <div className="container">
          {/*<DocumentTasks />*/}
          <h1>Dashboard</h1>
          <h3>My Documents</h3>
          <DocumentList currentUrlPath={currentUrlPath} documents={documents} />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired,
  ownerID: PropTypes.number.isRequired,
  documents: PropTypes.array.isRequired,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ownerID: state.isAuth.loggedInUser.id,
    documents: state.isAuth.loggedInUserDocuments || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
