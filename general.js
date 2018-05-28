var express = require('express');
var router = express.Router();
var DButilsAzure = require('./DButils');
var jsonConcat = require("json-concat");
const superSecret = "OurSecretKeyIsTheBest!"; // secret variable
var jwt = require('jsonwebtoken');

router.get('/getCountries', function(req,res){
    fs.readFile('countries.xml', 'utf-8', function (err, data){
        if(err) console.log(err);
        // we log out the readFile results    
        console.log(data);
    
        // we then pass the data to our method here
        parseString(data, function(err, result){
            if(err) console.log(err);
            // here we log the results of our xml string conversion
            console.log(result); 
            // save our json to a variable
            var json = result;
            var countries = [];
            for(var i = 0; i < json.Countries.Country.length; i++){
                countries[i] = json.Countries.Country[i].Name[0]
            }        
            res.json(countries);
        });
    });    
})
   
router.get('/getCategories', function(req, res){
    DButilsAzure.execQuery("SELECT * FROM Categories").then(function (recordSet) {   
        res.json(recordSet);
   }).catch(function (err) {
    res.send(err);
        });
})

router.post('/register', function(req,res){
   var UserName = req.body.userName;
   var Password = req.body.password;
   var confirmedPassword = req.body.confirmedPassword;
   var FirstName = req.body.firstName;
   var LastName = req.body.lastName;
   var City = req.body.city;
   var Country = req.body.country;
   var Email = req.body.email;
   var categories = req.body.categories;
   var answersForRecovery = req.body.answersForRecovery;
   if(UserName.length <3 || UserName.length > 8){
        res.json({ success: false, message: 'Please enter a 3 to 8 characters in UserName.' });
   }
   else if(!(/^[a-zA-Z]+$/.test(UserName))){
        res.json({ success: false, message: 'Please enter only alphabet characters for user name.' });
   }
   else if(Password.length <5 || Password.length > 10){
        res.json({ success: false, message: 'Please enter a 5 to 10 numbers for your password.' });
   }
   else if(!(/^[A-Za-z0-9]+$/.test(Password))){
        res.json({ success: false, message: 'Please enter only numbers and alphabet characters for your password.' });
   }   
   else if(Password != confirmedPassword){
        res.status(500).send({error: 'Passwords doesn\'t match'})
    }
   else{
        DButilsAzure.execQuery("INSERT INTO RegisteredUsers (UserName, Pass, FirstName, LastName, City, Country, Email,Answer1,Answer2, NumOfFavorites) VALUES ('"+UserName+"','"+Password+"','"+FirstName+"','"+LastName+"','"+City+"','"+Country+"','"+Email+"','"+answersForRecovery[0]+"','"+answersForRecovery[1]+"',0)").then(function (recordSet) {
            res.send('User is registered in the system.')
            }).catch(function (err) {
                res.send(err);
            });
        for(var i=0; i<categories.length;i++){
            DButilsAzure.execQuery("INSERT INTO CategoriesForUser (CategoryName, UserName) VALUES ('"+categories[i]+"','"+UserName+"')").then(function (recordSet) {  
            }).catch(function (err) {
                res.send(err);
            });
        }
    }
});

router.post('/login',function(req,res){

    var user = req.body.userName;
    var password = req.body.password;
    
    //get all existing users from db 
    var foundUser = false;
    var userIndex = -1;
    var users = DButilsAzure.execQuery("SELECT UserName, Pass FROM RegisteredUsers").then(function (recordSet) {
       // console.log(recordSet);   
        console.log(recordSet);
        for(var i=0; i<recordSet.length; i++){
            console.log("user in db: "+recordSet[i].UserName);
            if(recordSet[i].UserName == user)
            {
                foundUser = true;
                userIndex = i;
                break;
            }
        }
        if(!foundUser){
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else{ //user exists in db
            if(recordSet[userIndex].Pass != password){
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else{ //password matches
                //generate token to user
                var payload = {
                    userName: user
                    //admin: user.isAdmin
                }
                var token = jwt.sign(payload, superSecret, {
                    expiresIn: "1d" // expires in 24 hours
                });
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    }).catch(function (err) {
        res.send(err);
            });
})

router.post('/forgotpass',function(req,res){
    var userName = req.body.userName;
    var userQuestion = req.body.question;
    var userAnswer = req.body.answer;
    var answer = "Answer"+userQuestion;
    console.log(answer);
    DButilsAzure.execQuery("SELECT Answer1, Pass FROM RegisteredUsers WHERE UserName='"+userName+"'").then(function (recordSet) {   
      
         if(userAnswer == recordSet[0].Answer1){
            res.send('Your password is: '+recordSet[0].Pass);
         }
    }).catch(function (err) {
        res.send(err);
            });
})

module.exports = router;