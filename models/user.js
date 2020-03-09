module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    googleId: {
      type: DataTypes.STRING,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true
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
    state: {
      type: DataTypes.STRING
    },
    isRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
