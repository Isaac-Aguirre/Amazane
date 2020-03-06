module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item",{
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0
      }
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        min: 1
      }
    },
    picture:{
      type: DataTypes.STRING,
      allowNull: true,
      validate:{

      }
    },

  });
  return Item;
};
