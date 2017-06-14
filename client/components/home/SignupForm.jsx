import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TextInput from '../common/TextInput.jsx';

/**
 * @desc component used to display the signup form
 */
const SignupForm = ({ onChange, onSubmit, loading, errors }) =>
  <form className="login-form">
    <div className="card-content">
      <div className="row">
        <div className="col s4 offset-s2">
          <input
            name="firstname"
            type="text"
            onChange={onChange}
            placeholder="Your firstname here"
            required />
        </div>
        <div className="col s4">
          <input
            name="lastname"
            type="text"
            onChange={onChange}
            placeholder="Your lastname here"
            required />
        </div>
      </div>
      <div className="row">
        <div className="col s4 offset-s2">
          <input
            name="username"
            type="text"
            onChange={onChange}
            placeholder="Your username here"
            required />
        </div>
        <div className="col s4">
          <input
            name="email"
            type="email"
            onChange={onChange}
            placeholder="Your email here"
            required />
        </div>
      </div>
      <div className="row">
        <div className="col s4 offset-s2">
          <input
            name="password"
            type="password"
            onChange={onChange}
            placeholder="Your password here"
            required />
        </div>
        <div className="col s4">
          <input
            name="confirmPassword"
            type="password"
            onChange={onChange}
            placeholder="Confirm your password"
            required />
        </div>
      </div>
    </div>

    <div className="card-action">
      <div className="row">
        <div className="input-field col s12">
          <input
            id="saveProfile"
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
;

/**
 * @desc Set the PropTypes
 */
SignupForm.propTypes = {
  user: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default SignupForm;
