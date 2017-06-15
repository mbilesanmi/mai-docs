import React, { Component, PropTypes } from 'react';

class EditUserProfile extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="card-image" />
              <div className="card-content">
                <h1 className="center">Edit User profile</h1>
                <form>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Firstname:</p>
                      <input
                        name="firstname"
                        type="text"
                        placeholder="Your firstname here"
                        required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6 offset-s3">
                      <p className="flow-text">Lastname:</p>
                      <input
                        name="lastname"
                        type="text"
                        placeholder="Your lastname here"
                        required />
                    </div>
                  </div>
                  <p className="center flow-text">Username:</p>
                  <p className="center flow-text">Email: </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUserProfile;
