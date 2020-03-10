module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        orderNumber: {
            type: DataTypes.STRING,
            allownull: false,
        },
        userID: {
            type: DataTypes.STRING,
            allownull: false
        },
        itemID: {
            type: DataTypes.STRING,
            allownull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allownull: false,
            validate: {
                min: 1
            }
        }

    });

    return Order;
};

