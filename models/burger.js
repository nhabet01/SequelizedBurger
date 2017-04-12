//Sequelize Burger Model

module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        //sequelize automatically adds ID as primary key and auto increments

        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,

            unique: {
                msg: "Burgername already exists"

            }
        },

        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
 
    },  {
            validate: {
                checkBurgerName: function(){
                    if (this.burger_name ===null){
                        throw new Error('A burger name is required!')
                    }
                }
            }

        },
        {
            classMethods: {
                associate: function(models) {
                    Burger.belongsTo(models.Customer, { 
                        foreignKey: {
                            allowNull: true//allowing Null b/c burgers created before customers.
                        }
                    });
                }
            }
        }
    );

    return Burger;
};