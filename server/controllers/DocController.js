import model from '../models';

const Docs = model.Doc;

const DocController = {
  create(request, response) {
    return Docs
      .create(request.body)
      .then(doc => response.status(201).send(doc))
      .catch(error => response.status(400).send(error));
  },
  getAll(request, response) {
    return Docs
      .findAll({})
      .then(docs => response.status(200).send(docs))
      .catch(error => response.status(400).send(error));
  },
  getOne(request, response) {
    return Docs
      .findById(request.params.docId, {})
      .then((doc) => {
        if (!doc) {
          return response.status(404).send({
            message: 'Document does not exist'
          });
        }
        return response.status(200).send(doc);
      })
      .catch(error => response.status(400).send(error));
  },
  update(request, response) {
    return Docs
      .findById(request.params.documentId, {})
      .then((doc) => {
        if (!doc) {
          return response.status(404).send({
            message: 'Document Not Found',
          });
        }
        return doc
          .update(request.body)
          .then(() =>
            // Send back the updated todo.
            response.status(200).send(doc))
          .catch(error => response.status(400).send(error));
      })
      .catch(error => response.status(400).send(error));
  },
  deleteDoc(request, response) {
    return Docs
      .findById(request.params.docId)
      .then((doc) => {
        if (!doc) {
          return response.status(400).send({
            message: 'Document not found',
          });
        }
        return doc
          .destroy()
          .then(() =>
            response.status(200).send({
              message: 'Document deleted successfully.'
            })
          )
          .catch(error => response.status(400).send(error));
      })
      .catch(error => response.status(400).send(error));
  },
};

export default DocController;
