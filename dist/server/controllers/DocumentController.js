'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Documents = _models2.default.Document;
var Users = _models2.default.User;

var DocumentController = {
  create: function create(request, response) {
    if (request.body.title === '' || request.body.content === '' || request.body.viewAccess === '') {
      return response.status(400).send({
        message: 'Fields cannot be empty'
      });
    }
    return Documents.create({
      title: request.body.title,
      content: request.body.content,
      viewAccess: request.body.viewAccess,
      ownerId: request.body.ownerId
    }).then(function (document) {
      return response.status(201).send({
        document: document,
        message: 'Document created successfully!'
      });
    }).catch(function (error) {
      return response.status(500).send({
        error: error,
        message: 'Something went wrong! The document could not be saved.'
      });
    });
  },
  update: function update(request, response) {
    if (request.body.title === '' || request.body.content === '' || request.body.viewAccess === '') {
      return response.status(400).send({
        message: 'Fields cannot be empty'
      });
    }
    return Documents.findById(parseInt(request.params.id, 10), {}).then(function (document) {
      if (!document) {
        return response.status(404).send({
          message: 'Document Not Found'
        });
      }
      return document.update({
        title: request.body.title,
        content: request.body.content,
        viewAccess: request.body.viewAccess
      }).then(function () {
        return response.status(200).send({
          document: document,
          message: 'Document successfully updated!'
        });
      }).catch(function (error) {
        return response.status(500).send({
          error: error,
          message: 'Something went wrong! The document could not be saved.'
        });
      });
    }).catch(function (error) {
      return response.status(500).send({
        error: error,
        message: 'The document could not be saved.'
      });
    });
  },
  delete: function _delete(request, response) {
    return Documents.findById(parseInt(request.params.id, 10), {}).then(function (document) {
      if (!document) {
        return response.status(400).send({
          message: 'Document not found'
        });
      }
      return document.destroy().then(function () {
        return response.status(200).send({
          message: 'Document deleted successfully.'
        });
      }).catch(function (error) {
        return response.status(500).send({
          error: error,
          message: 'Something went wrong! The document could not be saved.'
        });
      });
    }).catch(function (error) {
      return response.status(500).send({
        error: error,
        message: 'The document could not be deleted.'
      });
    });
  },
  getAll: function getAll(request, response) {
    var offset = request.query.offset || 0;
    var limit = 12;

    Documents.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        viewAccess: {
          $ne: 'Private'
        }
      },
      include: {
        model: Users,
        attributes: ['id', 'username', 'roleId', 'firstname', 'lastname']
      },
      order: [['updatedAt', 'DESC']]
    }).then(function (documents) {
      if (documents.length < 1) {
        return response.status(404).send({
          message: 'no document found'
        });
      }

      var metaData = {
        totalCount: documents.count,
        pages: Math.ceil(documents.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: documents.rows.length
      } || null;

      return response.status(200).send({
        documents: documents.rows,
        metaData: metaData
      });
    }).catch(function (error) {
      return response.status(400).send(error);
    });
  },
  getUserDocuments: function getUserDocuments(request, response) {
    var offset = request.query.offset || 0;
    var limit = 12;

    return Users.findById(request.params.id).then(function (user) {
      if (!user) {
        return response.status(404).json({
          message: 'User not found'
        });
      }
      return Documents.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {
          ownerId: request.params.id
        },
        include: {
          model: Users,
          attributes: ['id', 'username', 'roleId', 'firstname', 'lastname']
        },
        order: [['updatedAt', 'DESC']]
      }).then(function (documents) {
        if (documents.count < 1) {
          return response.status(404).send({
            message: 'no document found'
          });
        }

        var metaData = {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length
        } || null;

        return response.status(200).send({
          documents: documents.rows,
          metaData: metaData
        });
      }).catch(function (error) {
        response.status(500).send({
          error: error,
          message: 'Error occurred while retrieving documents'
        });
      });
    });
  },
  getOne: function getOne(request, response) {
    return Documents.findById(parseInt(request.params.id, 10), {
      include: {
        model: Users,
        attributes: ['id', 'username', 'roleId', 'firstname', 'lastname']
      }
    }).then(function (document) {
      if (document) {
        return response.status(200).send({
          document: document,
          message: 'Document loaded'
        });
      }
      return [];
    }).catch(function (error) {
      return response.status(500).send({
        error: error,
        message: 'Something went wrong! The document could not be opened.'
      });
    });
  },
  search: function search(request, response) {
    var search = request.query.search;
    var offset = request.query.offset || 0;
    var limit = 12;

    return Documents.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        $or: [{
          title: {
            $iLike: '%' + search + '%'
          }
        }, {
          content: {
            $iLike: '%' + search + '%'
          }
        }],
        $and: {
          viewAccess: 'Private'
        }
      },
      include: {
        model: Users,
        attributes: ['id', 'username', 'roleId', 'firstname', 'lastname']
      },
      order: [['updatedAt', 'DESC']]
    }).then(function (documents) {
      if (documents.count <= 0) {
        return response.status(404).send({
          message: 'No documents found matching search criteria'
        });
      }
      var metaData = {
        totalCount: documents.count,
        pages: Math.ceil(documents.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: documents.rows.length
      } || null;

      return response.status(200).send({
        documents: documents.rows,
        metaData: metaData,
        message: 'Documents found'
      });
    }).catch(function (error) {
      response.status(500).send({
        error: error,
        message: 'Error occurred while retrieving documents'
      });
    });
  }
};

exports.default = DocumentController;