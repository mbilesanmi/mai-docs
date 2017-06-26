// export default (sequelize, DataTypes) => {
//   const Access = sequelize.define('Access', {
//     accessid: {
//       type: DataTypes.NUMBER,
//       allowNull: false,
//       unique: true,
//       validate: {
//         notEmpty: {
//           msg: 'Accessid field cannot be empty'
//         }
//       }
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         notEmpty: {
//           msg: 'The title field cannot be empty'
//         }
//       }
//     }
//   }, {
//     classMethods: {
//       associate: (models) => {
//         // associations can be defined here
//         Access.hasMany(models.Documents, {
//           foreignKey: 'access'
//         });
//       }
//     }
//   });
//   return Access;
// };
