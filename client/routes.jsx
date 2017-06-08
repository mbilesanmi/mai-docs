import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Login from './components/home/Signin.jsx';
import Dashboard from './components/home/Dashboard.jsx';
import SignupPage from './components/home/Signup.jsx';
import AllDocuments from './components/document/AllDocuments.jsx';
import AllUsers from './components/user/AllUsers.jsx';
import ManageDocument from './components/document/ManageDocument.jsx';
import ViewDocument from './components/document/ViewDocument.jsx';
import FourOFour from './components/common/FourOFour.jsx';
// import AboutPage from './components/about/AboutPage.jsx';
// import UsersPage from './components/user/UsersPage.jsx';
// import ManageUserPage from './components/user/ManageUserPage.jsx';
// import RolesPage from './components/role/RolesPage.jsx';
// import ManageRolePage from './components/role/ManageRolePage.jsx';
// import CoursesPage from './components/course/CoursesPage.jsx';
// import ManageCoursePage from './components/course/ManageCoursePage.jsx';
// import SigninPage from './components/auth/Signin.jsx';
import requireAuth from './utils/requireAuthentication';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="dashboard" component={requireAuth(Dashboard)} />
    <Route path="users" component={requireAuth(AllUsers)} />
    <Route path="documents" component={requireAuth(AllDocuments)} />
    <Route path="document" component={requireAuth(ManageDocument)} />
    <Route path="document/view/:id" component={requireAuth(ViewDocument)} />
    <Route path="document/:id" component={requireAuth(ManageDocument)} />
    <Route path="signup" component={SignupPage} />
    <Route path="404" component={FourOFour} />
    {/* Require admin auth */}
    {/*<Route path="documents" component={requireAuth(AllDocuments)} />*/}
    {/* Require owner auth */}
    {/*<Route path="about" component={AboutPage} />
    <Route path="login" component={SigninPage} />
    <Route path="documents" component={requireAuth(DocumentsPage)} />
    {/*<Route path="users" component={requireAuth(UsersPage)} />*/}
    {/*<Route path="roles" component={requireAuth(RolesPage)} />
    <Route path="role" component={requireAuth(ManageRolePage)} />
    <Route path="role/:id" component={requireAuth(ManageRolePage)} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />*/}
  </Route>
);
