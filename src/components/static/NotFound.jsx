import React from 'react';

/**
 * NotFound - renders a 404 page;
 * @returns {Object} React element to render
 */
export default function NotFound() {
  return (
    <div className="full-height flex-center position-ref">
      <div className="row">
        <div className="row">
          <div className="col s12 m12 l9">
            <div className="card white">
              <div className="card-content">
                <span className="card-title">
                  <h1>404!</h1>
                </span>
                <p>The page you have visited doesn't exist</p>
              </div>
            </div>
          </div>
          {sidebar}
        </div>
      </div>
      
    </div>
  );
}
