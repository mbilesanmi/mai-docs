import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';
import DocumentListRow from './DocumentListRow.jsx';
import DocumentActionBar from './DocumentActionBar.jsx';
import * as actions from '../../actions/documentActions';

class AllDocuments extends Component {
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

  componentWillMount() {
    if (this.props.isAuth.isAuthenticated) {
      this.props.actions.getAllDocuments(this.state.offset);
    }
  }

  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
    this.props.actions.search(event.target.value)
    .catch(() => {
      toastr.error(this.props.message);
    });
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.props.metaData.pageSize);

    console.log('selected', selected, 'offset', offset);
    this.setState({ offset }, () => {
      this.props.actions.getAllDocuments(offset);
    });
  }

  render() {
    const { documents, searchResults, metaData } = this.props;

    if (documents) {
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
    return null;
  }
}

AllDocuments.propTypes = {
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
AllDocuments.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = state => ({
  isAuth: state.isAuth,
  message: state.message,
  documents: state.documents.documents,
  metaData: state.documents.metaData,
  loggedInUserID: state.isAuth.loggedInUser.id
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AllDocuments);
