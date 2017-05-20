import path from 'path';
// import documents from './documents';
// import roles from './roles';
// import users from './users';

// module.exports = (app) => {
const Routes = (app) => {
  // Setup a default catch-all route that sends back a welcome message in JSON format.
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/index.html'));
  //   res.status(200).send({
  //     message: 'Welcome to the beginning of nothingness.',
  //   })
  // });
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
  });

  // app.use('/api/documents', documents);
  // app.use('/api/roles', roles);
  // app.use('/api/users', users);
};

export default Routes;
