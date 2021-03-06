var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// PROFIL RUTE
router.get("/:username", function(req, res){
     var brukeren = req.params.username;
     User.findOne({"username":brukeren}, function(err, users){
         if(err){
             req.flash("error", err.message);
             res.redirect("/");
         } else {
             res.render("./brukere/show", {brukeren: users});
         }
     });
});
// EDIT ROUTE 
router.get("/:username/settings", isLoggedIn, function(req,res){
    var reqbruker = req.params.username; 
    var currentUser = req.user.username; 
    var query = User.findOne({ 'username': reqbruker });
    if(reqbruker === currentUser){
        query.exec(function (err, funnetBruker) {
        if (err) {
          console.log(err);
        }else {
          res.render("./brukere/settings", {brukeren: funnetBruker});
        }
  
});
    }else {
        req.flash("error", "Du har ikke tillatelse!");
        res.redirect("/");
    }
});
// UPDATE ROUTE 
router.put("/:username/settings", isLoggedIn, function(req, res){
    var query = User.findOne({ 'username': req.params.username });
    User.findOneAndUpdate(query, req.body.brukeren, function(err, updatedBruker){
        if(err){
            console.log(err);
        } else {
            //finner bare første bruker i database ps oppdatater dette
            console.log("updated" + updatedBruker);
             console.log("updated: " + updatedBruker.username);
             console.log("updated:" + updatedBruker.beskrivelse);
            res.redirect("/"+req.params.username);
        }
    })
 
});
// LANDINGSSIDEN TIL GAMES.
router.get("/:username/games" ,middleware.isLoggedIn ,function(req, res) {
  res.render("./games/gamesHome");
});

router.get("/:username/games/spaceinvaders", function(req, res) {
    var brukeren = req.params.username;
    
     User.findOne({"username":brukeren}, function(err, users){
         if(err){
             console.log(err);
         } else {
             res.render("./games/spaceinvaders/index", {brukeren: users});
         }
     });
  
 });

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Du må være innlogget for å gjøre dette!");//legger til flash. coden skal utføres før du redirecter!
    res.redirect("/login");
};

module.exports = router; //exportert slik at den kan brukes i app.js
