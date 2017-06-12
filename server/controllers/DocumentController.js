import model from '../models';

const Documents = model.Document;
const Users = model.User;

const DocumentController = {
  create(request, response) {
    if (request.body.title === '' || request.body.content === ''
      || request.body.viewAccess === '') {
      return response.status(400).send({
        message: 'Fields cannot be empty'
      });
    }
    return Documents
      .create({
        title: request.body.title,
        content: request.body.content,
        viewAccess: request.body.viewAccess,
        ownerId: request.body.ownerId
      })
      .then(document => response.status(201).send({
        document,
        message: 'Document created successfully!'
      }))
      .catch(error => response.status(500).send({
        error,
        message: 'Something went wrong! The document could not be saved.'
      }));
  },
  update(request, response) {
    if (request.body.title === '' || request.body.content === ''
      || request.body.viewAccess === '') {
      return response.status(400).send({
        message: 'Fields cannot be empty'
      });
    }
    return Documents
      .findById(parseInt(request.params.id, 10), {})
      .then((document) => {
        if (!document) {
          return response.status(404).send({
            message: 'Document Not Found'
          });
        }
        return document
          .update({
            title: request.body.title,
            content: request.body.content,
            viewAccess: request.body.viewAccess
          })
          .then(() => response.status(200).send({
            document,
            message: 'Document successfully updated!'
          }))
          .catch(error => response.status(500).send({
            error,
            message: 'Something went wrong! The document could not be saved.'
          }));
      })
      .catch(error => response.status(500).send({
        error,
        message: 'The document could not be saved.'
      }));
  },
  delete(request, response) {
    return Documents
      .findById(parseInt(request.params.id, 10), {})
      .then((document) => {
        if (!document) {
          return response.status(400).send({
            message: 'Document not found'
          });
        }
        return document
          .destroy()
          .then(() =>
            response.status(200).send({
              message: 'Document deleted successfully.'
            })
          )
          .catch(error => response.status(500).send({
            error,
            message: 'Something went wrong! The document could not be saved.'
          }));
      })
      .catch(error => response.status(500).send({
        error,
        message: 'The document could not be deleted.'
      }));
  },
  getAll(request, response) {
    const offset = request.query.offset || 0;
    const limit = 12;

    Documents
      .findAndCountAll({
        limit,
        offset,
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
      })
      .then((documents) => {
        if (documents.length < 1) {
          return response.status(404).send({
            message: 'no document found'
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
      .catch(error => response.status(400).send(error));
  },
  getUserDocuments(request, response) {
    const offset = request.query.offset || 0;
    const limit = 12;

    return Users.findById(request.params.id)
    .then((user) => {
      if (!user) {
        return response.status(404).json({
          message: 'User not found'
        });
      }
      return Documents
      .findAndCountAll({
        limit,
        offset,
        where: {
          ownerId: request.params.id
        },
        include: {
          model: Users,
          attributes: ['id', 'username', 'roleId', 'firstname', 'lastname']
        },
        order: [['updatedAt', 'DESC']]
      })
      .then((documents) => {
        if (documents.count < 1) {
          return response.status(404).send({
            message: 'no document found'
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
      .catch((error) => {
        response.status(500).send({
          error,
          message: 'Error occurred while retrieving documents'
        });
      });
    });

  },
  getOne(request, response) {
    return Documents
      .findById(parseInt(request.params.id, 10), {
        include: {
          model: Users,
          attributes: ['id', 'username', 'roleId', 'firstname', 'lastname']
        }
      })
      .then((document) => {
        if (document) {
          return response.status(200).send({
            document,
            message: 'Document loaded'
          });
        }
        return [];
      })
      .catch(error => response.status(500).send({
        error,
        message: 'Something went wrong! The document could not be opened.'
      }));
  },
  search(request, response) {
    const search = request.query.search;
    const offset = request.query.offset || 0;
    const limit = 12;

    return Documents
      .findAndCountAll({
        limit,
        offset,
        where: {
          $or: [{
            title: {
              $iLike: `%${search}%`
            }
          }, {
            content: {
              $iLike: `%${search}%`
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
      })
      .then((documents) => {
        if (documents.count <= 0) {
          return response.status(404).send({
            message: 'No documents found matching search criteria'
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
          metaData,
          message: 'Documents found'
        });
      })
      .catch((error) => {
        response.status(500).send({
          error,
          message: 'Error occurred while retrieving documents'
        });
      });
  }
};

export default DocumentController;
