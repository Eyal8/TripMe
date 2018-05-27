var express = require('express');
var router = express.Router();
var DButilsAzure = require('./DButils');

router.get('/getSingle/:name', function(req,res){
    var name = req.params.name;
//    DButilsAzure.execQuery("SELECT POI_name, NumOfViews, POI_description, POI_rank, Review1, Review2, PicturePath, Category FROM POI WHERE POI_name = '"+name+"'").then(function (recordSet) {   
        DButilsAzure.execQuery("SELECT * FROM POI WHERE POI_name = '"+name+"'").then(function (recordSet) {   
        res.json({
            success: true,
            POI_name: recordSet[0].POI_name,
            NumOfViews: recordSet[0].NumOfViews,
            POI_description: recordSet[0].POI_description,
            POI_rank: recordSet[0].POI_rank,
            Review1: recordSet[0].Review1,
            Review2: recordSet[0].Review2,
            PicturePath: recordSet[0].PicturePath,
            Category: recordSet[0].Category
        });
   }).catch(function (err) {
    res.send(err);
        });
        DButilsAzure.execQuery("UPDATE POI SET NumOfViews = NumOfViews + 1 WHERE POI_name = '"+name+"").then(function (recordSet) {   
            res.json({ success: true, message: 'Point of interest is saved to favorites.' });
        }).catch(function (err) {
        res.send(err);
               });
})


router.get('/all_poi', function(req,res){
        DButilsAzure.execQuery("SELECT * FROM POI").then(function (recordSet) {   
        res.json(recordSet);
   }).catch(function (err) {
    res.send(err);
        });
    
})


router.get('/updatePOIs', function(req,res){
    DButilsAzure.execQuery("SELECT NumOfViews, POI_rank, Review1, Review2 FROM POI").then(function (recordSet) {   
    res.json(recordSet);
}).catch(function (err) {
res.send(err);
        });
})
module.exports = router;