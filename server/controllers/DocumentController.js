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
    const search = request.query.search;
    return Documents
      .findAll({
        where: {
          $or: [{
            title: {
              $iLike: `%${search}%`
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
            message: 'No documents found matching search criteria'
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
  }
};

export default DocumentController;
