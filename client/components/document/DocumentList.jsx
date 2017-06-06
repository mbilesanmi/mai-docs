import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow.jsx';

const DocumentList = ({ documents }) => (
  <div className="row">
    <div className="col s12">
      {documents.map(document =>
        <DocumentListRow
          key={document.id}
          document={document}
        />
      )}
    </div>
  </div>
);

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentList;
