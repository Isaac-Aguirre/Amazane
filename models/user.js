module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    accountType: {
      type: DataTypes.STRING
    },
    googleId: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    isRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
