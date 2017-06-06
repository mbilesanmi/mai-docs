import React, { PropTypes } from 'react';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
// import TextInput from '../common/TextInput.jsx';
// import SelectInput from '../common/SelectInput.jsx';
// import SelectInput from '../common/SelectInput.jsx';
// import TextInput from '../common/.jsx';

const options = [
  { name: 'viewAccess', value: 'Public', label: 'Public' },
  { name: 'viewAccess', value: 'Private', label: 'Private' },
  { name: 'viewAccess', value: 'Role', label: 'Role' }
];

const DocumentForm = ({ document, onSave,
  onChange, saving, errors }) => (
  <form>
    <h1>Title: { document.title }</h1>
    <div className="row">
      <div className="input-field col l8 m8 s12">
        <input
          name="title"
          type="text"
          value={document.title}
          onChange={onChange}
          placeholder="Document title goes here" />
        <label htmlFor="title">Title</label>
      </div>

      <div className="input-field col l4 m4 s12">
        {/*<Select
            name="viewAccess"
            onChange={onChange}
            options={options}
        />*/}
        {/*<label htmlFor="viewAccess">Select Document Permission</label>*/}
        <select name="viewAccess" className="browser-default" value={document.viewAccess} onChange={onChange}>
          <option value="">Choose your option</option>
          <option value="Private">Private</option>
          <option value="Public">Public</option>
          <option value="Role">Role</option>
        </select>
      </div>
    </div>

    {/*<TextInput
      name="title"
      label="Title"
      value={document.title}
      onChange={onChange}
      error={errors.title}/>*/}

    {/*<SelectInput
      name="viewAccess"
      label=""
      options={options}
      value={document.viewAccess}
      onChange={onChange}
      clearable=""
    />*/}

    <div className="row">
      <div className="input-field">
        <textarea
          name="content"
          id="content"
          value={document.content}
          onChange={onChange}
          className="materialize-textarea"
          placeholder="Enter your document content here" />
        {/*<textarea
          name="content"
          id="content"
          value={document.content}
          onChange={onChange}
          className="materialize-textarea" />*/}
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


/*import React, { PropTypes } from 'react';
// import DocumentListRow from './DocumentListRow.jsx';

const DocumentForm = () => (
  <div className="row">
    <div className="col s12">
      <h1>Document Form</h1>
    </div>
  </div>
);

// DocumentList.propTypes = {
//   documents: PropTypes.array.isRequired
// };

export default DocumentForm;*/
