import colors from 'colors';
import models from '../../models';

// drops table and re-creates it
models.sequelize.sync({ force: true })
.then(() => {
  console.info('Database cleared'.red);
})
.catch((error) => {
  throw (error);
});
