import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App.jsx';
import Login from './components/home/Signin.jsx';
import Dashboard from './components/home/Dashboard.jsx';
import SignupPage from './components/home/Signup.jsx';
// import AboutPage from './components/about/AboutPage.jsx';
// import DocumentsPage from './components/document/DocumentsPage.jsx';
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
    <Route path="signup" component={SignupPage} />
    {/*<Route path="about" component={AboutPage} />
    <Route path="login" component={SigninPage} />
    <Route path="documents" component={requireAuth(DocumentsPage)} />
    <Route path="users" component={requireAuth(UsersPage)} />
    <Route path="user" component={requireAuth(ManageUserPage)} />
    <Route path="user/:id" component={requireAuth(ManageUserPage)} />
    <Route path="roles" component={requireAuth(RolesPage)} />
    <Route path="role" component={requireAuth(ManageRolePage)} />
    <Route path="role/:id" component={requireAuth(ManageRolePage)} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />*/}
  </Route>
);
