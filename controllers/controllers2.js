//This is the "routes" file

var express = require('express');
var router = express.Router();
var db = require('../models');
var path = require('path');


//Get all (= Sequelize findAll method) then sends data to handlebars for rendering.
router.get('/', function(req,res){
    db.Burger.findAll({
        order: 'burger_name ASC',
        // include: [{model:db.Customer, required: false}]//don't think include isnecessary here
    }).then(function(burger_data){

        var hbsObject ={
            burgers: burger_data
        };
        res.render('index', hbsObject);
    });
});//end get (findAll)

//When we post/insert a burger, we call Sequelize's create method and then get redirected to '/'...which then renders all burgers
router.post('/burgers/create', function(req,res){
    // if(req.body.burger_name.trim()===""){
    //    res.redirect('/');
    // }else{

    db.Burger.create({
        burger_name:req.body.burger_name
    }).then(function(data,err){
        
            res.redirect('/');//revert to this if render doesn't work
        
    }).catch(function(error){
        if (error){
            console.log("#error: "+ error);
            console.log("#error.message: "+ error.message);
            if (error.message.includes('Validation error:')) {
                error.message = error.message.slice(17)
            }
            var nullErr ={nullError:error.message}
            // res.render('index',{nullError:error.message});

            db.Burger.findAll({
                order: 'burger_name ASC',
            // include: [{model:db.Customer, required: false}]//don't think include isnecessary here
            }).then(function(burger_data){

                var hbsObject ={
                    burgers: burger_data
                };
                res.render('index', {burgers:burger_data, nullError:error.message});
            });        
        }

    });
    // }
        //by redirecting to '/' we call the findAll to render the burgers on the page
});//end post (Create)

//Post & Update route: When we put/update (devour) a burger, a customer is created then the update method used to assign the name to a burger 
router.put('/api/customer/:id', function(req,res){
    var customer = req.body.customer_name;
    db.Customer.create({
        customer_name: customer
    }).then(function(data,err) {
        var devoured = true;
        // var ID = req.params.id;

        db.Burger.update({
            devoured: devoured,
            customer: data.dataValues.customer_name},
            {where: {id: req.params.id}}
        ).then(function() {
            res.redirect('/');
        })
    }).catch(function(error){
            if (error){
                console.log("#error: "+ error);
                console.log("#error.message: "+ error.message);
                if (error.message.includes('Validation error:')) {
                    error.message = error.message.slice(17)
                }
                // var nullErr ={nullError:error.message}
                // res.render('index',{nullError:error.message});

                db.Burger.findAll({
                    order: 'burger_name ASC',
                // include: [{model:db.Customer, required: false}]//don't think include isnecessary here
                }).then(function(burger_data){

                    var hbsObject ={
                        burgers: burger_data
                    };
                    res.render('index', {burgers:burger_data, custError:error.message});
                });        
            }

        });//catch here
});//end put (updateOne, devoured)


// PUT (update) route which calls Sequelize's update method to make devoured =false.
// Uses the id to identify which burger to re-use and clears out CustomerId.
router.put('/api/reorder/:id', function (req, res) {
    var devoured = false;
    // var ID = req.params.id;

    db.Burger.update(
        {devoured: devoured,
        CustomerId: null},
        {where: {id: req.params.id}}
    ).then(function () {
        res.redirect('/');
    });
});

//================ If users attempt to access a non existent page, take back to index====================
router.use(function(req, res) {

    res.render(path.join(__dirname, "/../views/index.handlebars"));
});


module.exports = router;