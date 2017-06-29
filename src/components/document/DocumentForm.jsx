import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import FroalaEditor from 'react-froala-wysiwyg';

// Require Editor JS files.
require('../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js');

const editorConfig = {
  height: 350,
  toolbarButtons: [
    'bold',
    'italic',
    'underline',
    '|',
    'fontFamily',
    'fontSize',
    'color',
    '|',
    'paragraphFormat',
    'align',
    'formatOL',
    'formatUL',
    'outdent',
    'indent',
    'quote',
    '-',
    'strikeThrough',
    'subscript',
    'superscript',
    '|',
    'insertLink',
    'insertHR',
    'selectAll',
    'clearFormatting',
    '|',
    'spellChecker',
    'help',
    '|',
    'undo',
    'redo'
  ]
};


/**
 * @desc component used to display the document form
 * @returns {*} no form element
 */
const DocumentForm = ({ document, roleId, onSave, onChange, onModelChange, saving }) =>
<form onSubmit={onSave}>
  <div className="row">
    <div className="col s8 m8 ofset-s2 offset-m2">
      <div className="row">

        <div className="row">
          <div className="form-group has-feedback input-field col l7 m7 s12">
            <span>Title</span>
            <input
              type="text"
              name="title"
              className="form-control"
              value={document.title}
              onChange={onChange}
              placeholder="Document title goes here"
              required="required" />
          </div>

          <div className="form-group has-feedback input-field col l5 m5 s12">
            <span>Access Level</span>
            <select name="access" className="browser-default" required="required"
              value={document.viewAccess} onChange={onChange}>
              <option value="">Choose your option</option>
              <option value="-1">Private</option>
              <option value="0">Public</option>
              <option value={roleId}>Role</option>
            </select>
          </div>
          <div className="form-group has-feedback input-field col l12 m12 s12">
            <span>Content</span>
            <div className="input-field">
              <FroalaEditor
                tag="textarea"
                className="content"
                config={editorConfig}
                model={document.content}
                onModelChange={onModelChange}
              />
            </div>
          </div>

          <div className="form-group has-feedback input-field col s6 offset-s3">
            <input
              id="saveDocument"
              type="submit"
              disabled={saving}
              value={saving ? 'Saving...' : 'Save'}
              className="btn btn-primary" />
            &nbsp;
            <Link to="/dashboard" className="btn grey lighten-1">
              Cancel
            </Link>
          </div>

        </div>
      </div>
    </div>
  </div>
</form>;

/**
 * @desc Set the PropTypes
 */
DocumentForm.propTypes = {
  document: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onModelChange: PropTypes.func,
  onChange: PropTypes.func,
  saving: PropTypes.bool
};

export default DocumentForm;
