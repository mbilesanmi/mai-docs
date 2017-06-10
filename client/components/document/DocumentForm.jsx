import React, { PropTypes } from 'react';

const DocumentForm = ({ document, onSave,
  onChange, saving }) => (
  <form>
    <div className="row">
      <h5 className="col l1 m1 s12">Title:</h5>
      <div className="input-field col l7 m7 s12">
        <input
          name="title"
          type="text"
          value={document.title}
          onChange={onChange}
          placeholder="Document title goes here" />
      </div>

      <h5 className="col l1 m1 s12">Access:</h5>
      <div className="input-field col l3 m3 s12">
        <select name="viewAccess" className="browser-default" value={document.viewAccess} onChange={onChange}>
          <option value="">Choose your option</option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
          <option value="Role">Role</option>
        </select>
      </div>
    </div>

    <div className="row">
      <h5 className="col l1 m1 s12">Content:</h5>
      <div className="input-field">
        <textarea
          name="content"
          id="content"
          value={document.content}
          onChange={onChange}
          className="materialize-textarea"
          placeholder="Enter your document content here" />
      </div>
    </div>

    <input
      type="submit"
      disabled={saving}
      value={saving ? 'Saving...' : 'Save'}
      className="btn btn-primary"
      onClick={onSave}/>
  </form>
);

DocumentForm.propTypes = {
  document: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default DocumentForm;
