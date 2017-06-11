import React from 'react';
import TinyMCE from 'react-tinymce';

const DocumentForm = ({ document, onSave,
  onChange, onEditorChange, saving }) =>
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
        <select name="viewAccess" className="browser-default"
          value={document.viewAccess} onChange={onChange}>
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
        <TinyMCE
          content={document.content}
          config={{
            height: '160',
            plugins: 'link image code',
            toolbar: `undo redo 
              | bold italic | alignleft 
              aligncenter alignright | code`
          }}
          onChange={onEditorChange}
        />
        {/*<textarea
          rows="100"
          name="content"
          id="content"
          value={document.content}
          onChange={onChange}
          className="materialize-textarea"
          placeholder="Enter your document content here" />*/}
      </div>
    </div>

    <input
      id="saveDocument"
      type="submit"
      disabled={saving}
      value={saving ? 'Saving...' : 'Save'}
      className="btn btn-primary"
      onClick={onSave}/>
  </form>;

DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onEditorChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default DocumentForm;
