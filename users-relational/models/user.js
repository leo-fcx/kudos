module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    kudosQty: DataTypes.INTEGER
  }, {
    freezeTableName: true,
  });

  return User;
};
