var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Battle = require("../models/battle");

//Landing siden til gamport.
router.get("/", isLoggedIn, function(req, res){
    res.render("landing");
});
router.get("/ranking", function(req, res) {

    User.find({}).sort({totalscore: -1}).exec(function(err, users){
       if(err){
           console.log(err.message);
       } else {
          res.render("./games/ranking", {users: users});
       }
    });
        
    
});

//Info siden om ranking til spillere. 
//mulig refaktor til battle routes i fremtiden. 
// router.get("/ranking", function(req, res) {
//     User.find({}, function(err, users) {
//         if(err){
//             req.flash("error", err);
//             res.redirect("back");
//         } else {
//             res.render("./games/ranking", {users: users});
//         }
//     });
   
// });
//instance fra spaceinvaders, singleplayer only. 
router.get("/:username/games/spaceinvaders", function(req, res) {
    var brukeren = req.params.username;
     User.findOne({"username":brukeren}, function(err, users){
         if(err){
             console.log(err);
         } else {
             res.render(__dirname + "/../" + "views/games/spaceinvaders/index", {brukeren: users});
         }
     });
  
 });
// LOGIN 
router.get("/login", function(req, res){
    res.render("login");
});

// LOGIN 
router.post("/login",passport.authenticate("local", 
    {
        failureFlash: "Brukernavn eller passord er feil!",
        successFlash: "Velkommen til battlearena!",
        successRedirect:"",
        failureRedirect: "/login"
    }), function(req, res){
        res.redirect("/battle");
});
// NY BRUKER 
router.get("/register", function(req, res){
    res.render("register");
});
// NY BRUKER 
router.post("/register", function(req,res){
   var newUser = new User({username: req.body.username, opprettet: new Date()});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           return res.redirect("register");
       }
       passport.authenticate("local")(req, res, function(){
           req.flash("success", "Velkommen til gameport!!");
           res.redirect("/"+ req.user.username);
       });
   });
});
//LOGOUT
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logget deg ut!"); //alltid før redirect!
   res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Du må være innlogget for å gjøre det!");//legger til flash. coden skal utføres før du redirecter!
    res.redirect("/login");
};

module.exports = router; //exportert slik at den kan brukes i app.js
