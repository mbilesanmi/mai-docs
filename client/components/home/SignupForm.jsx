import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput.jsx';

const SignupForm = ({ onChange, onSubmit, loading, errors }) => (
  <form className="login-form">
    <div className="row">
      <div className="col s8 offset-s2">
        <TextInput
          type="text"
          label="Firstname"
          name="firstname"
          icon="person"
          onChange={onChange}
          onBlur=""
          clearError=""
          error={errors.firstname}/>
      </div>
    </div>
    <div className="row">
      <div className="col s8 offset-s2">
        <TextInput
          type="text"
          label="Lastname"
          name="lastname"
          icon="person"
          onChange={onChange}
          onBlur=""
          clearError=""
          error={errors.lastname}/>
      </div>
    </div>
    <div className="row">
      <div className="col s8 offset-s2">
        <TextInput
          type="text"
          label="Username"
          name="username"
          icon="person"
          onChange={onChange}
          onBlur=""
          clearError=""
          error={errors.username}/>
      </div>
    </div>
    <div className="row">
      <div className="col s8 offset-s2">
        <TextInput
          type="email"
          label="Email"
          name="email"
          icon="email"
          onChange={onChange}
          onBlur=""
          clearError=""
          error={errors.email}/>
      </div>
    </div>
    <div className="row">
      <div className="col s8 offset-s2">
        <TextInput
          type="password"
          label="Password"
          name="password"
          icon="lock"
          onChange={onChange}
          onBlur=""
          clearError=""
          error={errors.password}/>
      </div>
    </div>

    <div className="row">
      <div className="input-field col s12">
        <input
          type="submit"
          disabled={loading}
          value={loading ? 'Creating user profile...' : 'Signup'}
          className=
            "btn waves-effect waves-light col s4 offset-s4 teal darken-1"
          onClick={onSubmit}/>
      </div>
      
      <div className="input-field col s12">
        <p className="margin center medium-small sign-up">
          Already have an account?
          <Link to="/"> Signin</Link>
        </p>
      </div>
    </div>
  </form>
);

SignupForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default SignupForm;
