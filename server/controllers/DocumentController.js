import model from '../models';

const Documents = model.Document;
// const Roles = model.Role;
const Users = model.User;

// getMyDocuments(request, response) {
//   Documents
//     .findAll({
//       where: { ownerId: request.body.username }
//     })
//     .then(documents => response.status(200).send(documents))
//     .catch(error => response.status(400).send(error));
// },

const DocumentController = {
  create(request, response) {
    // console.log('reuest', request.body);
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
    // console.log('docs id in server', request.params.id);
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
          .then(() => response.status(201).send({
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
    Documents
      .findAll()
      .then(documents => response.status(200).send(documents))
      .catch(error => response.status(400).send(error));
  },
  getMyDocuments(req, res) {
    return Documents
    .findAll({
      where: {
        $or: [
          { viewAccess: 'public' },
          {
            role: String(req.decoded.data.roleId)
          },
          {
            userId: req.params.id
          }
        ]
      },
      include: [Users],
      order: [['updatedAt', 'DESC']]
    })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send({
      error,
      message: 'Error occurred while retrieving documents'
    }));
  },
  getOne(request, response) {
    return Documents
      .findById(parseInt(request.params.id, 10), {})
      .then((document) => {
        if (!document) {
          return response.status(404).send({
            message: 'Document does not exist'
          });
        }
        return response.status(200).send({
          document,
          message: 'Document loaded'
        });
      })
      .catch(error => response.status(500).send({
        error,
        message: 'Something went wrong! The document could not be opened.'
      }));
  },
  search(request, response) {
    // console.log('search req', request);
    const search = request.query.search;
    return Documents
      .findAll({
        where: {
          $or: [{
            title: {
              $iLike: `%${search}%`,
            }
          }, {
            content: {
              $iLike: `%${search}%`
            }
          }]
        }
      })
      .then((documents) => {
        if (documents.length <= 0) {
          return response.status(404)
          .send({
            message: 'No documents found matching search criteria',
          });
        }
        return response.status(200).send({
          documents,
          message: 'Documents found'
        });
      })
      .catch((error) => {
        response.status(500).send({
          error,
          message: 'Error occurred while retrieving documents'
        });
      });
  },
};

export default DocumentController;
