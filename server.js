//Add dependencies/requiring npm packages 
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");
var flash = require('express-flash');
var path = require('path')

// Sets up the Express App
// =============================================================
var app = express();

//Deploy in current environment or 8080
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Middleware
//Use of "static" makes our public folder inaccessible via the browser
app.use("/static/",express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes 
//=============================================================
//////
// var routes = require("./controllers/burgers_controllers.js");
var routes = require("./controllers/controllers2.js");//pics don't get rendered

app.use('/', routes);

// Syncing our sequelize models/db and then starting our express app

db.sequelize.sync({ force: false }).then(function(data, error) {
    app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});