var express = require('express');
var request = require('request');
var initialize = require("./config");

var router = express.Router();
var sanboxUrl = 'https://api.sandbox.paypal.com';

router.post('/create', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        "intent": "CAPTURE",
        
        "payer": {
                    "email_address": "usbuyer1@test.com"
        },
        "purchase_units": [
            {
                "reference_id": "ref_12311124",
                "description": "Camera Shop",
                "amount": {
                    "currency_code": "INR",
                    "value": "25.00",
                    "breakdown": {
                        "item_total": {
                            "currency_code": "INR",
                            "value": "25.00"
                        },
                        "shipping": {
                            "currency_code": "INR",
                            "value": "0"
                        },
                        "handling": {
                            "currency_code": "INR",
                            "value": "0"
                        },
                        "tax_total": {
                            "currency_code": "INR",
                            "value": "0"
                        },
                        "gift_wrap": {
                            "currency_code": "INR",
                            "value": "0"
                        },
                        "shipping_discount": {
                            "currency_code": "INR",
                            "value": "0"
                        }
                    }
                },
              
                "items": [
                    {
                        "name": "Levis 501 Selvedge STF",
                        "sku": "5158936",
                        "unit_amount": {
                            "currency_code": "INR",
                            "value": "25.00"
                        },
                        "tax": {
                            "currency_code": "INR",
                            "value": "0.00"
                        },
                        "quantity": "1",
                        "category": "PHYSICAL_GOODS"
                    }
                ],
                "shipping": {
                    "address": {
                        "address_line_1": "500 Hillside Street",
                        "address_line_2": "#1000",
                        "admin_area_1": "TN",
                        "admin_area_2": "chennai",
                        "postal_code": "500050",
                        "country_code": "IN"
                    }
                },
                "shipping_method": "United Postal Service",
        
                "payment_group_id": 1,
                "custom_id": "custom_value_123213123",
                "invoice_id": "123123d1"+Math.random()*1000,
                "soft_descriptor": "Payment Camera Shop"
            }
        ],
        "application_context": {
            "brand_name":"flipkart",
            "return_url": "https://pcp-orderv2.herokuapp.com/orderv2/success",
            "cancel_url": "https://pcp-orderv2.herokuapp.com/orderv2/success"
        }
    };
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: req.body,
        json: true
            
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log(response.body);
            res.json(response.body);
        });
    }, function(err){
        console.log(err);
    });
});

//coming from web payment sdk
router.post('/capture', function(req, res) {
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders/'+req.body.id+'/capture',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }          
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
             console.log(response.body);
            /*res.json({
                "status" : "success"
            });*/
            res.writeHead(302,{'Location':("com.herokuapp.apmanative.androidecorderv2cct://success?token="+req.query.token)});       
        
        });
    });
});

//coming from ios
router.get('/success', function(req, res) {
    console.log("success enter");
    var PayerID=req.query.PayerID;
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders/'+req.query.token+'/capture',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }          
    };
    initialize().then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            if(response.statusCode == 200 || response.statusCode == 201) {
               // res.writeHead(302,{'Location':("app://com.herokuapp.apmanative.androidecorderv2cct://success?token="+req.query.token+"&PayerID="+PayerID)});       
                res.redirect("app://com.herokuapp.apmanative.androidecorderv2cct://success?token="+req.query.token+"&PayerID="+PayerID);
            } else {
                //res.writeHead(302,{'Location':("app://com.herokuapp.apmanative.androidecorderv2cct://success?token="+null)});
                res.redirect("app://com.herokuapp.apmanative.androidecorderv2cct://success?token="+null+"&PayerID="+null);
           
            }      
            res.end();
        });
    });
});

router.get('/cancel/', function(req, res) {
    console.log("cancel request");
    res.writeHead(302,{'Location':("com.reena.orderv2://cancel?token="+req.query.token)}); 
    res.end();
});


module.exports = router;