// Import Sequelize library for `Sequelize.literal`.
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
            
            customer_name: {
                type: DataTypes.STRING(35),
                allowNull: false
            }
         
        });

    // Return the model we defined.
    return Customer;
};
