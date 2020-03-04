module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item",{
    sku:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKEY: true,
      validate:{
        isNumeric: true,
        len: [5,10]
      }
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    category:{
      type: DataTypes.String,
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
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        len:[1,200]
      }
    },
    picture:{
      type: DataTypes.BLOB,
      allowNull: true
    }
  });
  return Item;
};
