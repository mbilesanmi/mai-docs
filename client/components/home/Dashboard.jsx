import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import ReactPaginate from 'react-paginate';
import DocumentListRow from '../document/DocumentListRow.jsx';
import DocumentActionBar from '../document/DocumentActionBar.jsx';
import * as actions from '../../actions/documentActions';

class Dashboard extends Component {
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
      this.props.actions.getUserDocuments(this.props.loggedInUserID, this.state.offset);
    }
  }

  redirectToManageDocument() {
    this.context.router.push('/document');
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
    if (event.target.value === '') {
      this.props.actions.getUserDocuments(this.props.loggedInUserID, this.state.offset);
    }
    this.props.actions.search(event.target.value)
    .catch(() => {
      toastr.error(this.props.message);
    });
  }

  handlePageClick(data) {
    const selected = data.selected;
    const offset = Math.ceil(selected * this.props.metaData.pageSize);

    this.setState({ offset }, () => {
      this.props.actions.getUserDocuments(this.props.loggedInUserID, offset);
    });
  }

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
                <h1 className="center">My Documents</h1>
              <hr />
              <div className="col s12 m4 l4">
                <div className="card-panel teal lighten-2 z-depth-1">
                  <div className="row valign-wrapper">
                    <div className="col s10">
                      <h4>You have {documents.length} document(s) in total</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12 m4 l4">
                <div className="card-panel green z-depth-1">
                  <div className="row valign-wrapper">
                    <div className="col s10">
                      <h4>You have {documents.filter(document =>
                        documents.viewAccess === 'Public'
                      ).length} Public documents</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col s12 m4 l4">
                <div className="card-panel blue z-depth-1">
                  <div className="row valign-wrapper">
                    <div className="col s10">
                      <h4>You have {documents.filter(document =>
                        documents.viewAccess === 'Private'
                      ).length} Private documents</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DocumentActionBar
            redirectToManageDocument={this.redirectToManageDocument}
            onSearchChange={this.onSearchChange}
            onViewAccessChange={this.onViewAccessChange} />

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
}

Dashboard.propTypes = {
  documents: PropTypes.array,
  searchResults: PropTypes.array,
  loggedInUserID: PropTypes.number,
  search: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.object
};

// Pull in the React Router context
// so router is available on this.context.router.
Dashboard.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
