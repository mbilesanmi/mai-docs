/*eslint-disable no-tabs */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import * as userActions from '../../actions/userActions';
import * as documentActions from '../../actions/documentActions';
import Sidebar from '../common/Sidebar.jsx';

/**
 * Dashboard page view
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof Dashboard
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: false,
			search: '',
			offset: 0
    };

		this.searchDocuments = this.searchDocuments.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.updateSearchState = this.updateSearchState.bind(this);
		this.deleteDocument = this.deleteDocument.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
  }

	/**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/login');
    } else {
			this.props.userActions.getOneUser(this.props.authUser.id);
			this.props.documentActions.getUserDocuments(this.props.authUser.id, this.state.offset);
		}
  }

	searchDocuments(event) {
		event.preventDefault();
		this.props.documentActions.searchUserDocuments(this.state.search, this.state.offset)
		.then(() => {
			toastr.success(this.props.message);
		})
		.catch(() => {
			toastr.error(this.props.message);
		})
		;
	}

	updateSearchState(event) {
		event.preventDefault();
		this.setState({ search: event.target.value });
	}

	clearSearch(event) {
		event.preventDefault();
		this.props.documentActions.getUserDocuments(this.props.authUser.id, this.state.offset);
	}

	deleteDocument(event) {
		event.preventDefault();
    const id = event.target.getAttribute('name');
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this document!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, (isConfirm) => {
      if (isConfirm) {
        this.props.documentActions.deleteDocument(
          id, this.props.authUser.id)
        .then(() =>
          swal('Deleted!', 'The selected file has been deleted.', 'success')
        )
        .catch(() => {
          toastr.error('Unable to delete document');
        });
      } else {
        swal('Cancelled', 'Your document is safe :)', 'error');
      }
    });
	}

	/**
   * @desc handles change of the pagination
   * @param {any} data the page number
   * @returns {*} no return value
   */
  handlePageClick(data) {
		const selected = data.selected;

    const offset = Math.ceil(selected * this.props.documents.metaData.pageSize);

    this.setState({ offset }, () => {
			if (this.props.documents.search) {
				this.props.documentActions.searchUserDocuments(this.state.search, offset);
			} else {
				this.props.documentActions.getUserDocuments(this.props.authUser.id, offset);
			}
    });
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf Common
   */
  render() {
    const { user, documents, metaData } = this.props;
    let userDetails;
		let documentDetails;
		let pagination;

		if (documents.documents) {
			documentDetails = documents.documents;
			pagination = <ReactPaginate previousLabel={'previous'}
				nextLabel={'next'}
				breakLabel={<a href="">...</a>}
				breakClassName={'break-me'}
				pageCount={documents.metaData.pages ? documents.metaData.pages : null}
				marginPagesDisplayed={3}
				pageRangeDisplayed={7}
				onPageChange={this.handlePageClick}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				activeClassName={'active'} />;
		} else {
			documentDetails = [];
			pagination = null;
		}

    if (user) {
      userDetails = <div>
				<div>Name: { user.firstname } { user.lastname }</div>
				<div>Username: {user.username}</div>
				<div>Email: {user.email}</div>
				<div>Role: {user.Role.title}</div>
				<div className="divider"></div>
				<Link to={`/user/${user.id}`}
					className="waves-effect btn blue lighten-2 editProfile">
				Update Profile</Link>
			</div>;
    }
    return (
			<div className="dashboard container">
				<div className="section">
					<h4>Dashboard</h4>
					<div className="divider"></div>
					<div className="row">
						<div className="col s12 m12 l9">
							<table className="striped">
								<thead>
									<tr>
											<th>Title</th>
											<th>Actions</th>
									</tr>
								</thead>

								<tbody>
									{documentDetails.map(document =>
										<tr key={document.id}>
											<td><h6><Link className="docTitle" to={`/document/view/${document.id}`}>{document.title.slice(0, 60)}...</Link></h6></td>
											<td>
												<Link
													to={`/document/${document.id}`}
													className="waves-effect waves-light btn green lighten-2 editDoc">Edit
												</Link>
												&nbsp;
												<btn
													onClick={this.deleteDocument}
													name={document.id}
													className="waves-effect waves-light btn red lighten-2">Delete
												</btn>
											</td>
										</tr>
									)}
								</tbody>
							</table>
							<div className="center">
								{pagination}
							</div>
						</div>
						<Sidebar
							userDetails={userDetails}
							clearSearch={this.clearSearch}
							updateSearchState={this.updateSearchState}
							search={this.searchDocuments} />
					</div>
				</div>
			</div>
    );
  }
}

/**
 * @desc Set the contextTypes
 */
Dashboard.contextTypes = {
  router: PropTypes.object
};

/**
 *  map state to props
 *
 * @param {state} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  message: state.message,
  isAuthenticated: state.authenticated.isAuth,
  authUser: state.authenticated.user,
  user: state.users || null,
  documents: state.documents || [],
  metaData: state.documents || null
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  documentActions: bindActionCreators(documentActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


//
// then begin working on the document aspect of the application
//
