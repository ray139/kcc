var express = require('express');
var router = express.Router();
var path = require('path');

var kccdata = require('../bin/kcc.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(kccdata);
  var reciveData = kccdata;
  for(var i=0; i<reciveData.products.length;i++){
    var product = reciveData.products[i];
    product.info = [];
    for(var j=0;j<reciveData.inventory.length;j++){
      if(product.guid === reciveData.inventory[j].guid){
        product.invQty = reciveData.inventory[j].qty;
      }
    }
    for(var k=0;k<reciveData.daily_usage.length;k++){
      if(product.guid === reciveData.daily_usage[k].guid){
        product.daiQty = reciveData.daily_usage[k].qty;
      }
    }
    for(var l=0;l<reciveData.last_order_date.length;l++){
      if(product.guid === reciveData.last_order_date[l].guid){
        product.lastDate = reciveData.last_order_date[l].date;
      }
    }
    for(var m=0;m<reciveData.children.length;m++){
      for(var n=0;n<reciveData.children[m].products.length;n++){
        if(product.guid === reciveData.children[m].products[n]){
          if(product.info.length === 0){
            product.info.push(reciveData.children[m]);
          }else{
            for(var o=0;o<product.info.length;o++){
              if(product.info[o].next_size_date != reciveData.children[m].next_size_date){
                product.info.push(reciveData.children[m]);
              }
            }
          }          
        }
      }
    }
  }

  function myFunction(){
    alert('Hi');
    res.render('index',{allData:reciveData});
  }

  res.render('index',{allData:reciveData});
});

module.exports = router;
