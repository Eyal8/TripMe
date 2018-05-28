var express = require('express');
var router = express.Router();
var DButilsAzure = require('./DButils');
var jwt = require('jsonwebtoken');
const superSecret = "OurSecretKeyIsTheBest!"; // secret variable

// route middleware to verify a token
router.use('/', function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("token " + token);
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, superSecret, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                // get the decoded payload and header
                var decoded = jwt.decode(token, {complete: true});
                req.decoded= decoded;
                console.log( decoded.payload.userName);
                req.userName = decoded.payload.userName;
                console.log(decoded.header);
                console.log(decoded.payload);
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

})

router.put('/reorder', function(req, res)
{
    var pois = req.body.pois;
  //  var promises = [];
    var func = DButilsAzure.execQuery("DELETE FROM POIsForUser WHERE UserName = '"+req.userName+"'");
   /* promises.push(DButilsAzure.execQuery("DELETE FROM POIsForUser WHERE UserName = '"+req.userName+"'"));  */   
    for(var i = 0; i < pois.length; i++)
    {
        func.then(DButilsAzure.execQuery("INSERT INTO POIsForUser (POI_name, UserName, CreatedAt) VALUES ('"+pois[i]+"','"+req.userName+"', GETDATE())"));   
    }
  //  Promise.all(promises).then(function(recordSet){
         func.then(function(x){
            res.json({
            success: true,
            message: "POIs reordered."
        })
        .catch(function (err) {
            res.send(err);
        });
})

router.post('/savePOI', function(req,res){
    var poi_name = req.body.poi_name;
    DButilsAzure.execQuery("IF NOT EXISTS (SELECT POI_name FROM POIsForUser WHERE POI_name = '"+poi_name+"' AND UserName = '"+req.userName+"') BEGIN UPDATE RegisteredUsers SET NumOfFavorites = NumOfFavorites + 1 WHERE UserName = '"+req.userName+"' END").then(function (recordSet) {   
    }).catch(function (err) {
        res.send(err);
            });

    DButilsAzure.execQuery("INSERT INTO POIsForUser (POI_name, UserName, CreatedAt) VALUES ('"+poi_name+"','"+req.userName+"', GETDATE())").then(function (recordSet) {   
        res.json({ success: true, message: 'Point of interest is saved to favorites.' });
    }).catch(function (err) {
       res.send(err);
       });
})

router.delete('/removePOI', function(req,res){
    var poi_name = req.body.poi_name;
    DButilsAzure.execQuery("IF EXISTS (SELECT POI_name FROM POIsForUser WHERE POI_name = '"+poi_name+"' AND UserName = '"+req.userName+"') BEGIN UPDATE RegisteredUsers SET NumOfFavorites = NumOfFavorites - 1 WHERE UserName = '"+req.userName+"' END").then(function (recordSet) {   
    }).catch(function (err) {
        res.send(err);
            });
    DButilsAzure.execQuery("DELETE FROM POIsForUser WHERE POI_name = '"+poi_name+"' AND UserName = '"+req.userName+"'; SELECT @@rowcount 'rowCount'").then(function (recordSet) {   
        if(recordSet[0].rowCount == 1){
            res.json({ success: true, message: 'Point of interest is removed from favorites.' });
        }
        else{
            res.json({ success: false, message: 'The point of interest does not exist in the system.' });
        }
    }).catch(function (err) {
    res.send(err);
        });

})

router.get('/getPOIs', function(req,res){
    DButilsAzure.execQuery("SELECT POI.POI_name, NumOfViews, POI_description, POI_rank, Review1, Review2, PicturePath, Category FROM POIsForUser JOIN POI ON POIsForUser.POI_name=POI.POI_name WHERE UserName = '"+req.userName+"'").then(function (recordSet) {   
        res.json(recordSet);
   }).catch(function (err) {
    res.send(err);
        });
})

router.get('/get2MostPopularPOIs', function(req,res){
   DButilsAzure.execQuery("DECLARE @category VARCHAR(100), @poi_name1 VARCHAR(100), @poi_name2 VARCHAR(100); SELECT @poi_name1=POI_name, @category=POI.Category FROM CategoriesForUser JOIN POI ON CategoriesForUser.CategoryName = POI.Category WHERE UserName = '"+req.userName+"' AND POI_rank = (SELECT MAX(POI_rank) FROM CategoriesForUser JOIN POI ON CategoriesForUser.CategoryName = POI.Category); SELECT @poi_name2 = POI.POI_name FROM CategoriesForUser JOIN POI ON CategoriesForUser.CategoryName = POI.Category WHERE UserName = '"+req.userName+"' AND POI.Category <> @category AND POI_rank = (SELECT MAX(POI_rank) FROM CategoriesForUser JOIN POI ON CategoriesForUser.CategoryName = POI.Category WHERE POI.Category <> @category); SELECT * FROM POI WHERE POI_name=@poi_name1; SELECT * FROM POI WHERE POI_name=@poi_name2").then(function(recordSet){
        res.json(recordSet);
   }).catch(function (err) {
    res.send(err);
        });    
})

router.get('/get2MostRecentPOIs', function(req,res){
    DButilsAzure.execQuery("SELECT POI.POI_name, NumOfViews, POI_description, POI_rank, Review1, Review2, PicturePath, Category, CreatedAt FROM POIsForUser JOIN POI ON POIsForUser.POI_name=POI.POI_name WHERE CreatedAt = (SELECT MAX(CreatedAt) FROM POIsForUser WHERE UserName='"+req.userName+"'); SELECT POI.POI_name, NumOfViews, POI_description, POI_rank, Review1, Review2, PicturePath, Category FROM POIsForUser JOIN POI ON POIsForUser.POI_name=POI.POI_name WHERE CreatedAt = (SELECT MAX(CreatedAt) FROM POIsForUser WHERE UserName='"+req.userName+"' AND CreatedAt < (SELECT MAX(CreatedAt) FROM POIsForUser WHERE UserName='"+req.userName+"'))").then(function(recordSet){
        if(recordSet.length == 0)
            res.json("You didnt save any point of interest");
        else
            res.json(recordSet);
    }).catch(function (err) {
     res.send(err);
         });    
 })

 router.put('/reviewPOI', function(req,res){
    var poi_name = req.body.poi_name;
    var review = req.body.review;
    DButilsAzure.execQuery("UPDATE POI SET Review2 = Review1, Review1 ='"+review+"' WHERE POI_name='"+poi_name+"'").then(function (recordSet) {   
        return res.json({ success: true, message: 'Your review is submitted.' });
    }).catch(function (err) {
        res.send(err);
            });
    
})

router.put('/rankPOI', function(req,res){
    var poi_name = req.body.poi_name;
    var rank = req.body.rank;
    var rankAsNum = parseFloat(rank);
    if(rankAsNum < 0 || rankAsNum > 100){
        res.json({ success: false, message: 'Please enter a number between 0 to 100.' });
    }
    else{
        DButilsAzure.execQuery("DECLARE @numOfRanks INT, @currentRank FLOAT; SELECT @numOfRanks=NumOfRanks, @currentRank=POI_rank FROM POI WHERE POI_name='"+poi_name+"'; UPDATE POI SET POI_rank=(@currentRank*@numOfRanks+'"+rank+"')/(@numOfRanks+1) WHERE POI_name='"+poi_name+"';UPDATE POI SET NumOfRanks = NumOfRanks + 1 WHERE POI_name='"+poi_name+"'").then(function (recordSet) {   
            return res.json({ success: true, message: 'Your rank is submitted.' });
        }).catch(function (err) {
            res.send(err);
        });
    }
})
module.exports = router;