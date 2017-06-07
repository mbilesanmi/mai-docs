import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow.jsx';

const DocumentList = ({ documents, loggedInUserID }) => (
  <div className="row">
    <div className="col s12">
      {documents.map(document =>
        <DocumentListRow
          loggedInUserID={loggedInUserID}
          key={document.id}
          document={document}
        />
      )}
    </div>
  </div>
);

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  loggedInUserID: PropTypes.number.isRequired
};

export default DocumentList;
