import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput.jsx';

const SignupForm = ({ onChange, onSubmit, loading, errors }) => (
  <form className="login-form">
    <div className="card-content">
      <div className="row">
        <div className="col s4 offset-s2">
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
        <div className="col s4">
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
        <div className="col s4 offset-s2">
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
        <div className="col s4">
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
        <div className="col s4 offset-s2">
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
        <div className="col s4">
          <TextInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            icon="lock"
            onChange={onChange}
            onBlur=""
            clearError=""
            error={errors.confirmPassword}/>
        </div>
      </div>
    </div>

    <div className="card-action">
      <div className="row">
        <div className="input-field col s12">
          <input
            type="submit"
            disabled={loading}
            value={loading ? 'Creating user profile...' : 'Signup'}
            className=
              "btn waves-effect waves-light col s2 offset-s5 teal darken-1"
            onClick={onSubmit}/>
        </div>
        
        <div className="input-field col s12">
          <p className="center medium-small sign-up">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>
        </div>
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
