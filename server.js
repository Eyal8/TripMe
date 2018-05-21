//this is only an example, handling everything is yours responsibilty !

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var util = require('util')
var cors = require('cors');
app.use(cors());
var DButilsAzure = require('./DButils');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var Movie = require('./Movies')
var movie = new Movie("Gladiator", 2000);
console.log(movie.fullName());


//////////  WRITE ROUTES AND db REQURESTS HERE, LOOK AT SLIDE 20 
app.use(function(req,res,next){
   // console.log(req.method, req.url);
    next();
})



app.post('/register', function(req,res){
   let userName = req.body.userName;
   let password = req.body.password;
   let confirmedPassword = req.body.confirmedPassword;
   if(password != confirmedPassword){
       res.status(500).send({error: 'Passwords doesn\'t match'})
   }
   let firstName = req.body.firstName;
   let lastName = req.body.lastName;
   let city = req.body.city;
   let country = req.body.country;
   let email = req.body.email;
   let categories = req.body.categories;
   let answersForRecovery = req.body.answersForRecovery;


   for(let i=0;i<categories.length;i++){
       console.log(categories[i]);
   }
   //console.log(userName + " " + password + " " +confirmedPassword + " " +firstName + " " +lastName + " " +city + " " +country+ " " +email + " " +answersForRecovery[1] + " " +categories);

});

app.get('/', function(req,res){
    //console.log("sup?");
    res.send("hello")
})
app.post('/addUser', function(req,res){
    console.log(req.body.Name);
    console.log(req.body.Age);
    console.log(req.body.FavouriteColour);
    res.send("User added to DB.");
})

/*app.post('/',function(req,res){
    res.
})*/

var port = 4000;
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
//-------------------------------------------------------------------------------------------------------------------

