import React, { PropTypes } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TextInput from '../common/TextInput.jsx';
// import SelectInput from '../common/SelectInput.jsx';
// import TextInput from '../common/.jsx';

const options = [
  { value: 'Public', label: 'Public' },
  { value: 'Private', label: 'Private' },
  { value: 'Role', label: 'Role' }
];

const DocumentForm = ({ document, onSave,
    onChange, saving, errors }) => {
  return (
    <form>
      <h1>Title: { document.title }</h1>
      <TextInput
        name="title"
        label="Title"
        value={document.title}
        onChange={onChange}
        error={errors.title}/>

      <Select
          name="viewAccess"
          options={options}
          value={document.viewAccess}
          onChange={onChange}
          onInputChange={onChange}
          placeholder="Set document access rights"
          clearable=""
        />

      <TextInput
        name="content"
        label="Content"
        value={document.content}
        onChange={onChange}
        error={errors.content}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

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
