import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput.jsx';

const SigninForm = ({ onChange, onSubmit, loading, errors }) => (
    <div className="col s6 offset-s3 z-depth-5 card">
      <div className="card-image">
        <span className="card-title">Card Title</span>
        <h2 className="center">LOGIN</h2>
      </div>
      <form className="login-form">
        <div className="card-content">
          <div className="row">
            <div className="col s6 offset-s3">
              <TextInput
                type="text"
                label="Username/Email"
                name="loginId"
                icon="person"
                onChange={onChange}
                onBlur=""
                clearError=""
                error={errors.loginId}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <TextInput
                type="password"
                label="Password"
                name="password"
                icon="lock"
                onChange={onChange}
                clearError=""
                error={errors.password}/>
            </div>
          </div>
        </div>
        <div className="card-action">
          <div className="row">
            <div className="input-field col s12">
              <input
                type="submit"
                disabled={loading}
                value={loading ? 'Please wait...' : 'Login'}
                className=
                  "btn waves-effect waves-light col s4 offset-s4 teal darken-1"
                onClick={onSubmit}/>
            </div>
            <div className="input-field col s12">
              <p className="margin center medium-small sign-up">
                Don't have an account?
                <Link to="/signup"> Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

SigninForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default SigninForm;
