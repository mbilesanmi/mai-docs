import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DocumentListRow = ({ document }) => (
    <tr>
      <td><a href="">View</a></td>
      <td><Link to={`/document/${document.id}`}>{document.title}</Link></td>
      <td>{document.viewAccess}</td>
      <td>{document.content}</td>
      <td>{document.createdAt}</td>
      <td>{document.updatedAt}</td>
    </tr>
  );

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired
};

export default DocumentListRow;
