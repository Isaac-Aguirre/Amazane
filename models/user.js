
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  });
  return User;
};
