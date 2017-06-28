import jwt from 'jsonwebtoken';
import model from '../models';

require('dotenv').config();

const Documents = model.Document;
const Users = model.User;
const secret = process.env.JWT_SECRET || 'secret';

const DocumentController = {
  createDocument(request, response) {
    return Documents
      .create({
        title: request.body.title,
        content: request.body.content,
        access: request.body.access,
        ownerId: request.decoded.id,
        roleId: request.decoded.roleId
      })
      .then((document) => response.status(201).send({
        document,
        message: 'Document saved successfully'
      }))
      .catch(error => response.status(400).send({
        message: error.errors || error
      }));
  },
  getAllDocuments(request, response) {
    const limit = request.query.limit ? request.query.limit : 12;
    const offset = request.query.offset ? request.query.offset : 0;
    const roleId = request.decoded.roleId;
    const ownerId = request.decoded.id;

    return Documents
      .findAndCountAll({
        limit,
        offset,
        order: [['updatedAt', 'DESC']],
        where: {
          $or: {
            ownerId,
            access: {
              $or: {
                $gte: roleId,
                $eq: 0
              }
            }
          }
        },
        include: {
          model: Users,
          attributes: ['username', 'roleId', 'firstname', 'lastname']
        }
      })
      .then((documents) => {
        if (documents.count <= 0) {
          return response.status(404).send({
            documents: null,
            message: 'No documents found'
          });
        }
        const metaData = {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length
        } || null;
        return response.status(200).send({
          documents: documents.rows,
          metaData
        });
      })
      .catch(error => response.status(400).send({
        message: error.errors || error.message
      }));
  },
  getUserDocuments(request, response) {
    const limit = request.query.limit ? request.query.limit : 12;
    const offset = request.query.offset ? request.query.offset : 0;
    const id = request.decoded.id;
    const userId = request.params.id;

    if (isNaN(userId)) {
      return response.status(400).send({
        message: 'Invalid userID entered'
      });
    }
    return Users
    .findById(id)
    .then((user) => {
      if (!user) {
        return response.status(404).send({
          message: 'User not found'
        });
      }
      return Documents
        .findAndCountAll({
          limit,
          offset,
          order: [['updatedAt', 'DESC']],
          where: {
            ownerId: id
          },
          include: {
            model: Users,
            attributes: ['username', 'roleId', 'firstname', 'lastname']
          }
        })
        .then((documents) => {
          if (documents.count <= 0) {
            return response.status(404).send({
              documents: null,
              message: 'No documents found'
            });
          }
          const metaData = {
            totalCount: documents.count,
            pages: Math.ceil(documents.count / limit),
            currentPage: Math.floor(offset / limit) + 1,
            pageSize: documents.rows.length
          } || null;
          return response.status(200).send({
            documents: documents.rows,
            metaData
          });
        })
        .catch(error => response.status(400).send({
          message: error.errors || error.message
        }));
    });
  },
  getOneDocument(request, response) {
    const documentId = parseInt(request.params.id, 10);

    if (isNaN(request.params.id)) {
      return response.status(400).send({
        message: 'Invalid document ID'
      });
    }
    return Documents
      .findById(documentId, {
        include: {
          model: Users,
          attributes: ['username', 'roleId', 'firstname', 'lastname']
        }
      })
      .then((document) => {
        if (document) {
          return response.status(200).send({
            document
          });
        }
        return response.status(404).send({
          document: null,
          message: 'Document ID not found'
        });
      })
      .catch(error => response.status(400).send({
        error,
        message: 'Something went wrong! The document could not be opened.'
      }));
  },
  updateDocument(request, response) {
    const documentId = parseInt(request.params.id, 10);
    const userId = request.decoded.id;

    if (isNaN(request.params.id)) {
      return response.status(400).send({
        message: 'Invalid document ID'
      });
    }
    return Documents.findById(documentId)
    .then((document) => {
      if (!document) {
        return response.status(404).send({
          message: 'Document not found'
        });
      } else if (userId !== document.ownerId) {
        return response.status(403).send({
          message: 'Unauthorized access'
        });
      }
      return document.update(request.body, {
        where: { id: documentId }
      })
      .then((editedDocument) => {
        return response.status(200).send({
          editedDocument,
          message: 'Document successfully updated'
        });
      });
    })
    .catch(error => response.status(400).send({
      // If the role is set but the required field isn't unique
      message: error.errors || error.message
    }));
  },
  searchAllDocuments(request, response) {
    const limit = request.query.limit ? request.query.limit : 12;
    const offset = request.query.offset ? request.query.offset : 0;
    const search = request.query.search;

    if (!search) {
      return response.status(400).send({
        message: 'You did not enter a search query'
      });
    }
    return Documents
      .findAndCountAll({
        limit,
        offset,
        order: [['updatedAt', 'DESC']],
        where: {
          $or: {
            title: { $iLike: `%${search}%` },
            content: { $iLike: `%${search}%` }
          },
          access: {
            $ne: 0
          }
        },
        include: {
          model: Users,
          attributes: ['username', 'roleId', 'firstname', 'lastname']
        }
      })
      .then((documents) => {
        if (documents.count <= 0) {
          return response.status(404).send({
            documents: null,
            message: 'No documents found'
          });
        }
        const metaData = {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length
        } || null;
        return response.status(200).send({
          search: true,
          message: `Found ${metaData.totalCount} documents matching your search`,
          documents: documents.rows,
          metaData
        });
      })
      .catch(error => response.status(400).send({
        message: error.errors || error.message
      }));
  },
  searchUserDocuments(request, response) {
    const limit = request.query.limit ? request.query.limit : 12;
    const offset = request.query.offset ? request.query.offset : 0;
    const search = request.query.search;
    const userId = request.decoded.id;

    if (!search) {
      return response.status(400).send({
        message: 'You did not enter a search query'
      });
    }
    return Documents
      .findAndCountAll({
        limit,
        offset,
        order: [['updatedAt', 'DESC']],
        where: {
          $or: {
            title: { $iLike: `%${search}%` },
            content: { $iLike: `%${search}%` }
          },
          ownerId: userId
        },
        include: {
          model: Users,
          attributes: ['username', 'roleId', 'firstname', 'lastname']
        }
      })
      .then((documents) => {
        if (documents.count <= 0) {
          return response.status(404).send({
            documents: null,
            message: 'No documents found'
          });
        }
        const metaData = {
          totalCount: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: Math.floor(offset / limit) + 1,
          pageSize: documents.rows.length
        } || null;
        return response.status(200).send({
          search: true,
          documents: documents.rows,
          metaData,
          message: `Found ${documents.count} documents matching your search`
        });
      })
      .catch(error => response.status(400).send({
        message: error.errors || error.message
      }));
  },
  deleteDocument(request, response) {
    const documentId = parseInt(request.params.id, 10);
    const userId = request.decoded.id;

    if (isNaN(request.params.id)) {
      return response.status(400).send({
        message: 'Invalid document ID'
      });
    }
    return Documents.findById(documentId)
    .then((document) => {
      if (!document) {
        return response.status(404).send({
          message: 'Document not found'
        });
      } else if (userId !== document.ownerId) {
        return response.status(401).send({
          message: 'Unauthorized access'
        });
      }
      return document.destroy({
        where: { id: documentId }
      })
      .then(() => response.status(200).send({
        message: 'Document successfully deleted'
      }));
    });
  }
};

export default DocumentController;
