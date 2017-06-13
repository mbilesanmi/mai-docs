[![Coverage Status](https://coveralls.io/repos/github/andela-milesanmi/mai-docs/badge.svg?branch=client-side-testing-145555901)](https://coveralls.io/github/andela-milesanmi/mai-docs?branch=client-side-testing-145555901)
[![Code Climate](https://codeclimate.com/github/andela-milesanmi/mai-docs/badges/gpa.svg)](https://codeclimate.com/github/andela-milesanmi/mai-docs/)
[![Build Status](https://travis-ci.org/andela-milesanmi/mai-docs.svg?branch=refactor-testing)](https://travis-ci.org/andela-milesanmi/mai-docs)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# MAI DOCS

MAI DOCS is a full-stack application that helps users manage their documents. A User can create a document and edit their documents.
The application utilizes RESTFUL API architecture for managing documents and users.

[Click here](http://mai-docs-staging.herokuapp.com/) to view the app on Heroku.

## Features

The app has two levels of authorization;
- An Author can:
    - create an account
    - login/logout.
    - create documents
    - edit and Delete his/her document
    - edit and Delete his/her profile
    - limit access to a document by specifying an access level to public or private.
    - view public documents created by other users.
    - view `role` documents created users with the same or lesser role level.

- An admin user has all the previlages of a regular user and can do the following too:
    - view all users.

## Technologies
The application was developed with [NodeJs](http://nodejs.org/), [Express](http://expressjs.com/) was used for routing and [Postgres](http://postgresql.com/) with sequelize was used for database management.
 ReactJS with the Redux architecture was used to build the client side of the application

## Installation
Follow the steps below to setup a local development environment. First ensure you have [Postgresql](https://www.postgresql.org/) installed, and a version of [Node.js](http://nodejs.org/) equal or greater than v6.10.0.

1. Clone the repository from a terminal `git clone https://github.com/andela-milesanmi/mai-docs.git`.
2. Navigate to the project directory `cd mai-docs`
3. Create a `.env` file and add the required DATABASE URL.
4. Install project dependencies `npm install`
5. Start the express server `npm start` or `npm start -s`.

## Testing
Ensure that project dependencies are installed before running tests.
### Server and Client tests
1. Open a terminal and navigate to the project directory
2. Add a test database url (DATABASE_TEST_URL) to the `.env` file.
3. Run `npm test`

## API Summary
View full API documentation [here](http://doc-mage.herokuapp.com/api)

### Users
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/users/login         |   Logs in a user.
POST /api/users/logout        |   Logs out a user.
POST /api/users/              |   Creates a new user.
GET /api/users/               |   Gets all users (available only to the Admin).
GET /api/users/:id           |   Find a user by id.
PUT /api/users/:id           |   Updates a user's profile based on the id specified (available to the profile owner or admin)
DELETE /api/users/:id        |   Delete a user's profile (available only to the admin)
GET /api/users/:id/documents   | Gets all documents for a particular user
GET /api/search/users/?q=${query} | Get all users with username containing the search query

### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /api/documents/          |   Creates a new document instance.
GET /api/documents/           |   Gets all documents.
GET /api/documents/:id       |   Find document by id.
PUT /api/documents/:id       |   Updates a document's attributes. (available only to the author)
DELETE /api/documents/:id    |   Delete a document. (available only to the author)
GET /api/search/documents/?q=${query} | Get all documents with title containing the search query

### Roles (can only be tested using postman)
EndPoint                      |   Functionality
------------------------------|------------------------
GET /roles/               |   Get all Roles.
POST /roles/               |   Create a Role.
PUT /roles/:id               |   Edit a Role.
DELETE /roles/:id               |   Delete a Role.

### Limitations

One major limitation is that the application cannot handle creation of new roles from the frontend.

### Contributing

Contributions are most welcome. Simply fork the repository, work on the feature and raise a PR.

### Licence
MIT
