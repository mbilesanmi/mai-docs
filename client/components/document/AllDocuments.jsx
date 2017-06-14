import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';
import DocumentListRow from './DocumentListRow.jsx';
import DocumentActionBar from './DocumentActionBar.jsx';
import * as actions from '../../actions/documentActions';

/**
 * @desc component used to display all public documents
 * @class AllDocuments
 * @extends {Component}
 */
class AllDocuments extends Component {
  /**
   * Creates an instance of AllDocuments.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof AllDocuments
   */
  constructor(props, context) {
    super(props, context);

    this.redirectToManageDocument = this.redirectToManageDocument.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      documents: [],
      searchResults: [],
      search: '',
      offset: 0
    };
  }

  /**
   * @desc handles the triggering of the necessary action
   * @returns {null} returns no value
   */
  componentWillMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getAllDocuments(this.state.offset);
    }
  }

  /**
   * @desc handles the redirecting to the manage documents page
   * @returns {null} returns no value
   */
  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  /**
   * @desc handles change of the search form
   * @param {any} event html event
   * @returns {*} no return value
   */
  onSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value)
    .catch(() => {
      toastr.error(this.props.message);
    });
  }

  /**
   * @desc handles change of the pagination
   * @param {any} data the page number
   * @returns {*} no return value
   */
  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.props.metaData.pageSize);

    this.setState({ offset }, () => {
      this.props.actions.getAllDocuments(offset);
    });
  }

  /**
   * @desc Renders the Document holder
   * @return {*} render the Document holder
   */
  render() {
    const { documents, searchResults, metaData } = this.props;
    let documentsInfo;

    if (!documents || this.props.message === 'no document found') {
      return (documentsInfo = <div className="section">
        <div className="container">
          <div className="col s12 m8 offset-m2 l6 offset-l3">
            <div className="card-panel teal lighten-3 z-depth-1">
              <div className="row valign-wrapper">
                <div className="col s10">
                  <h3>You have not created any documents</h3>
                  <div className="row">
                    <div className="col l4 m4 s1 offset-l3">
                      <a
                        onClick={this.redirectToManageDocument}
                        className="waves-effect waves-light btn-large green">
                        <i className="material-icons left">add</i>Add New Document
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
    }

    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col l12 m12 s12">
              <hr />
                <h1 className="center">Sitewide Documents</h1>
              <hr />
            </div>
          </div>

          <DocumentActionBar
            redirectToManageDocument={this.redirectToManageDocument}
            onViewAccessChange={this.onViewAccessChange}
            onSearchChange={this.onSearchChange}
            sitewide="sitewide" />

          <div className="center">
            <ReactPaginate previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={metaData.pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'} />
          </div>

          <div className="row">
            <div className="col s12">
              {documents.map(document =>
                <DocumentListRow
                  loggedInUserID={this.props.loggedInUserID}
                  key={document.id}
                  document={document} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
AllDocuments.propTypes = {
  documents: PropTypes.array,
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

/**
 * @desc Set the contextTypes
 */
AllDocuments.contextTypes = {
  router: PropTypes.object
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
function mapStateToProps(state) {
  return {
    isAuth: state.isAuth,
    message: state.message,
    documents: state.documents.documents,
    metaData: state.documents.metaData,
    loggedInUserID: state.isAuth.loggedInUser.id
  };
}

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
