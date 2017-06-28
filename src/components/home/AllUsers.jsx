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
import Sidebar from '../common/Sidebar.jsx';

/**
 * AllUsers page view
 * @class AllUsers
 * @extends {React.Component}
 */
class AllUsers extends Component {
  /**
   * Creates an instance of AllUsers.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof AllUsers
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      // user: Object.assign({}, props.user),
      isLoading: false,
			search: '',
			offset: 0
    };

		this.searchUsers = this.searchUsers.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
		this.updateSearchState = this.updateSearchState.bind(this);
		this.handlePageClick = this.handlePageClick.bind(this);
  }

	/**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.context.router.push('/login');
    }
    this.props.userActions.getAllUsers(this.state.offset);
    this.props.userActions.getOneUser(this.props.authUser.id);
  }

	searchUsers(event) {
		event.preventDefault();
		this.props.userActions.searchAllUsers(this.state.search, this.state.offset)
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
		this.props.userActions.getAllUsers(this.state.offset);
	}

	/**
   * @desc handles change of the pagination
   * @param {any} data the page number
   * @returns {*} no return value
   */
  handlePageClick(data) {
    const selected = data.selected;

    const offset = Math.ceil(selected * this.props.allUsers.metaData.pageSize);

    this.setState({ offset }, () => {
			if (this.props.allUsers.search) {
				this.props.userActions.searchAllUsers(this.state.search, offset);
			} else {
				this.props.userActions.getAllUsers(offset);
			}
    });
  }

  /**
   * Renders the view of the component
   * @returns {Object} react component to render
   * @memberOf Common
   */
  render() {
		const { oneUser, allUsers } = this.props;
		let userDetails;
		let usersDetails;
		let pagination;

		if (oneUser) {
			userDetails = <div>
				<div>Name: { oneUser.firstname } { oneUser.lastname }</div>
				<div>Username: {oneUser.username}</div>
				<div>Email: {oneUser.email}</div>
				<div>Role: {oneUser.Role.title}</div>
				<div className="divider"></div>
				<Link to={`/user/${oneUser.id}`}
					className="waves-effect btn blue">
				Update Profile</Link>
			</div>;
		}
		if (allUsers) {
			usersDetails = allUsers.users;
			pagination = <ReactPaginate previousLabel={'previous'}
				nextLabel={'next'}
				breakLabel={<a href="">...</a>}
				breakClassName={'break-me'}
				pageCount={allUsers.metaData.pages ? allUsers.metaData.pages : null}
				marginPagesDisplayed={2}
				pageRangeDisplayed={5}
				onPageChange={this.handlePageClick}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				activeClassName={'active'} />;
		} else {
			usersDetails = [];
			pagination = null;
		}
		return <div className="container">
			<div className="section">
				<h4>All Users</h4>
				<div className="divider"></div>
				<div className="row">
					<div className="col s12 m12 l9">
						<table className="striped responsive">
							<thead>
								<tr>
										<th>Firstname</th>
										<th>Lastname</th>
										<th>Username</th>
										<th>Email</th>
								</tr>
							</thead>

							<tbody>
								{usersDetails.map(user =>
									<tr key={user.id}>
										<td>{user.firstname}</td>
										<td>{user.lastname}</td>
										<td>{user.username}</td>
										<td>{user.email}</td>
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
						search={this.searchUsers} />
				</div>
			</div>
		</div>;
  }
}

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
  oneUser: state.users || null,
  allUsers: state.allUsers || null
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
