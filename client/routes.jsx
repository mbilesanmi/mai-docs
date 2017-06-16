import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Login from './components/home/Signin.jsx';
import Dashboard from './components/home/Dashboard.jsx';
import SignupPage from './components/home/Signup.jsx';
import AllUsers from './components/user/AllUsers.jsx';
import EditUserProfile from './components/user/EditUserProfile.jsx';
import AllDocuments from './components/document/AllDocuments.jsx';
import ManageDocumentContainer from './components/document/ManageDocument.jsx';
import ViewDocument from './components/document/ViewDocument.jsx';
import FourOFour from './components/common/FourOFour.jsx';
import requireAuth from './utils/requireAuthentication';
import requireAdminRole from './utils/requireAdminRole';

export default
<Route path="/" component={App}>
  <IndexRoute component={Login} />
  <Route path="dashboard" component={requireAuth(Dashboard)} />
  <Route path="users" component={requireAdminRole(AllUsers)} />
  <Route path="user/:id" component={requireAuth(EditUserProfile)} />
  <Route path="documents" component={requireAuth(AllDocuments)} />
  <Route path="document" component={requireAuth(ManageDocumentContainer)} />
  <Route path="document/view/:id" component={requireAuth(ViewDocument)} />
  <Route path="document/:id" component={requireAuth(ManageDocumentContainer)} />
  <Route path="signup" component={SignupPage} />
  <Route path="404" component={FourOFour} />
</Route>;
