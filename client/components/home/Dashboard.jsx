import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import toastr from 'toastr';
import * as documentActions from '../../actions/documentActions';
import DocumentList from '../document/DocumentList.jsx';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);

    // this.onSubmit = this.onSubmit.bind(this);
    // this.updateUserState = this.updateUserState.bind(this);

    this.state = {
      documents: [],
      // user: Object.assign({}, props.user),
      // errors: {},
      // isLoading: false
    };
  }

  componentWillMount() {
    // console.log('bvbldjvdjbvdfbv', state);
    this.props.actions.getMyDocuments(this.props.ownerID);
  }

  render() {
    const { documents } = this.props;
    // console.log('*(*(*(*(*(*(', documents);
    return (
      <div>
        <h1>Dashboard</h1>
        <h3>My Documents</h3>
        <DocumentList documents={documents} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired,
  ownerID: PropTypes.number.isRequired,
  documents: PropTypes.array.isRequired
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
