import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow.jsx';

const DocumentList = ({ documents, currentUrlPath }) => (
  <div className="row">
    <div className="col s12">
      {documents.map(document =>
        <DocumentListRow
          currentUrlPath={currentUrlPath}
          key={document.id}
          document={document}
        />
      )}
    </div>
  </div>
);

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
  currentUrlPath: PropTypes.string
};

export default DocumentList;
