import expect from 'expect';
import log from'npmlog';
import { role, newData } from '../helper/testHelper';
import models from '../../models';

const Role = models.Role;

const role1 = role.admin;
const role2 = role.author;
const emptyRole = newData.emptyRole;
let roleId;

describe.only('The roles model ', () => {
  before((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      log.info('Database cleared---'.green);
      done();
    });
  });
  after((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      log.info('Database cleared---'.green);
      done();
    });
  });

  it('should create a role', (done) => {
    Role.create(role1).then((role) => {
      roleId = role.id;
      expect(role.title).toEqual(role1.title);
      done();
    });
  });
  it('should throw an error if title is empty', (done) => {
    Role.create(emptyRole).then()
      .catch((error) => {
        expect(error.errors[0].message).toEqual('The title field cannot be empty');
        done();
      });
  });
  it('should update role', (done) => {
    Role.findById(roleId).then((role) => {
      role.update(role2).then((newRole) => {
        expect(newRole.title).toEqual(role2.title);
        done();
      });
    });
  });
  it('should delete a role', (done) => {
    Role.findById(roleId).then((role) => {
      role.destroy().then((response) => {
        expect(response).toEqual([]);
        done();
      });
    });
  });
});
