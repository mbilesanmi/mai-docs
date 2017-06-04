import React, { PropTypes } from 'react';
import DocumentListRow from './DocumentListRow.jsx';

const DocumentList = ({ documents }) => (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>View Access</th>
        <th>Content</th>
        <th>Publish Date</th>
        <th>Last Update</th>
      </tr>
      </thead>
      <tbody>
      {documents.map(document =>
        <DocumentListRow key={document.id} document={document}/>
      )}
      </tbody>
    </table>
  );

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentList;
