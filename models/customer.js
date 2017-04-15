// Import Sequelize library for `Sequelize.literal`.
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define('Customer', {
            
            customer_name: {
                type: DataTypes.STRING(35),
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'This field cannot be empty'
                    }
                }
            }
         
        },
        {
            classMethods: {
                associate: function(models){
                    Customer.hasMany(models.Burger,{
                        onDelete: "cascade"
                    });
                }
            }
        }
    );

    // Return the model we defined.
    return Customer;
};
