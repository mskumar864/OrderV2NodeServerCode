var express = require('express');
var request = require('request');
var initialize = require("./config");

var router = express.Router();
var sanboxUrl = 'https://api.sandbox.paypal.com';

//************************ Order V2 MSP Create partner Mar 2020************************/

router.post('/ordercreatemsp', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        "intent": "CAPTURE",
        "application_context": {
          "return_url": "https://localhost/return",
          "cancel_url": "https://localhost/cancel",
          "brand_name": "Your brandname here",
          "user_action": "PAY_NOW"
        },
        "purchase_units": [
          {
            "reference_id": "PU1111172381121"+Math.random()*100000,
            "amount": {
              "currency_code": "USD",
              "value": "111",
              "breakdown": {
                "item_total": {
                  "currency_code": "USD",
                  "value": "111.00"
                },
                "tax_total": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "shipping": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "handling": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "shipping_discount": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "insurance": {
                  "currency_code": "USD",
                  "value": "0.00"
                }
              }
            },
            "payee": {
              "merchant_id": "Z8CBBYH86KX3C"
            },
            "items": [
              {
                "name": "Item Number One",
                "sku": "binfoord1000",
                "unit_amount": {
                  "currency_code": "USD",
                  "value": "11.00"
                },
                "tax": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "quantity": "10"
              },
              {
                "name": "Something for Free",
                "sku": "freecover",
                "unit_amount": {
                  "currency_code": "USD",
                  "value": "1.00"
                },
                "tax": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "quantity": "1"
              }
            ],
            "shipping": {
              "address": {
                "name": {
                  "given_name": "John",
                  "surname": "Doe"
                },
                "address_line_1": "Shipping Address Line 1",
                "address_line_2": "Shipping Address Line 2",
                "admin_area_2": "Santa Clara",
                "admin_area_1": "CA",
                "postal_code": "95134",
                "country_code": "US"
              }
            },
            "payment_instruction": {
              "disbursement_mode": "INSTANT",
              "platform_fees": [
                {
                  "amount": {
                    "currency_code": "USD",
                    "value": "2.00"
                  },
                  "payee": {
                    "merchant_id": "DSYARQPV636P6"
                  }
                }
              ]
            },
            "invoice_id": "MYINVOICE127382145123"+Math.random()*100000,
            "custom_id": "Custom12321321123"+Math.random()*100000,
            "description": "your order on your name here",
            "soft_descriptor": "Name_on_bank_statement"
          },
          {
            "reference_id": "PU1232178332124"+Math.random()*100000,
            "amount": {
              "currency_code": "USD",
              "value": "222",
                   "breakdown": {
                          "item_total": {
                              "currency_code": "USD",
                              "value": "222.00"
                          },
                          "shipping": {
                              "currency_code": "USD",
                              "value": "0.00"
                          },
                          "handling": {
                              "currency_code": "USD",
                              "value": "0.00"
                          },
                          "tax_total": {
                              "currency_code": "USD",
                              "value": "0.00"
                          },
                          "insurance": {
                              "currency_code": "USD",
                              "value": "0.00"
                          },
                          "shipping_discount": {
                              "currency_code": "USD",
                              "value": "0.00"
                          }
                      }
            },
            "payee": {
              "merchant_id": "3M5SFHD87UCNA"
            },
            "items": [
              {
                "name": "Item Number One",
                "sku": "binfoord1000",
                "unit_amount": {
                  "currency_code": "USD",
                  "value": "22.00"
                },
                "tax": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "quantity": "10"
              },
              {
                "name": "Something for Free",
                "sku": "freecover",
                "unit_amount": {
                  "currency_code": "USD",
                  "value": "2.00"
                },
                "tax": {
                  "currency_code": "USD",
                  "value": "0.00"
                },
                "quantity": "1"
              }
            ],
            "shipping": {
              "address": {
                "name": {
                  "given_name": "John",
                  "surname": "Doe"
                },
                "address_line_1": "Shipping Address Line 1",
                "address_line_2": "Shipping Address Line 2",
                "admin_area_2": "Santa Clara",
                "admin_area_1": "CA",
                "postal_code": "95134",
                "country_code": "US"
              }
            },
            "payment_instruction": {
              "disbursement_mode": "INSTANT",
              "platform_fees": [
                {
                  "amount": {
                    "currency_code": "USD",
                    "value": "1.00"
                  },
                  "payee": {
                    "merchant_id": "DSYARQPV636P6"
                  }
                }
              ]
            },
            "invoice_id": "MYINVOICE12127211823321"+Math.random()*100000,
            "custom_id": "Custom1232132121231"+Math.random()*100000,
            "description": "your order on your name here hello",
            "soft_descriptor": "Name_on_bank_second"
          }
        ] 
          
    };
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
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

//MSP capture
router.post('/capturemsp', function(req, res) {
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders/'+req.body.id+'/capture',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            // 'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
         
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
             
            res.json(
               
                 response.body

            );
         //   res.writeHead(302,{'Location':("com.herokuapp.apmanative.androidecorderv2cct://success?token="+req.query.token)});       
        
        });
    });
});

//************************ Order V2 Create partner Dec 2019*************************/

router.post('/ordercreate', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        "intent": "CAPTURE",
        
  
        "purchase_units": [
            {
                "reference_id": "ref_12311124"+Math.random()*100000,
                "description": "Camera Shop",
                "amount": {
                    "currency_code": "USD",
                    "value": "25.00",
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": "25.00"
                        },
                        "shipping": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "handling": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "tax_total": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "gift_wrap": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "shipping_discount": {
                            "currency_code": "USD",
                            "value": "0"
                        }
                    }
                },
                "payee": {
                    "merchant_id" : "3M5SFHD87UCNA"
                  },
                "items": [
                    {
                        "name": "Levis 501 Selvedge STF",
                        "sku": "5158936",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": "25.00"
                        },
                        "tax": {
                            "currency_code": "USD",
                            "value": "0.00"
                        },
                        "quantity": "1",
                        "category": "PHYSICAL_GOODS"
                    }
                ],
                
                "shipping": {
                    "address": {
                        "address_line_1": "500 Hillside Street",
                        "address_line_2": "10 Downing Street",
                        "admin_area_1": "LONDON",
                        "admin_area_2": "LONDON",
                        "postal_code": "SW1A 2AA",
                        "country_code": "GB"
                    }
                },
                "shipping_method": "United Postal Service",
                "payment_instruction": {
                    "disbursement_mode": "INSTANT",
                    "platform_fees":[
                       {
                           "amount": {
                         "currency_code":"USD",
                           "value":"1.50"
                         },
                        "payee":{
                             "merchant_id":"DSYARQPV636P6"
                            }
                         }
                    ]
               },
                "payment_group_id": 1,
                "custom_id": "custom_value_123213123"+Math.random()*100000,
                "invoice_id": "123123d1"+Math.random()*1000,
                "soft_descriptor": "Payment Camera Shop"
            }
        ],
        "application_context": {
            "brand_name":"mykart",

            
            
            "return_url": "https://pcp-orderv2.herokuapp.com/orderv2/success",

            
            "cancel_url": "https://pcp-orderv2.herokuapp.com/orderv2/success"
        }
    };
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
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

//***************************** Data client token********/

router.post('/generate-token', function(req, res) {
    console.log("create order");
    console.log(req.body);
    var request = require("request");

    initialize().then(function(access_token){
        var options = { method: 'POST',
      url: 'https://api.sandbox.paypal.com/v1/identity/generate-token',
      headers: 
       { 
            Accept: 'application/json',
         Authorization:  'Bearer '+access_token,
         'Content-Type': 'application/json'
        
        },
      body: {},
      json: true };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json(response.body);
        console.log(body);
      });
  
    });
  
    


}
);



/************Data client token ends************* */











router.post('/create', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        "intent": "CAPTURE",
        
  
        "purchase_units": [
            {
                "reference_id": "ref_12311124",
                "description": "Camera Shop",
                "amount": {
                    "currency_code": "USD",
                    "value": "25.00",
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": "25.00"
                        },
                        "shipping": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "handling": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "tax_total": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "gift_wrap": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "shipping_discount": {
                            "currency_code": "USD",
                            "value": "0"
                        }
                    }
                },
              
                "items": [
                    {
                        "name": "Levis 501 Selvedge STF",
                        "sku": "5158936",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": "25.00"
                        },
                        "tax": {
                            "currency_code": "USD",
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

//ignore this---sample codecoming from web payment sdk-- sample code
router.post('/capture', function(req, res) {
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders/'+req.body.id+'/capture',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           // 'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            // 'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
           // 'PayPal-Mock-Response': '{"mock_application_codes" : "INSTRUMENT_DECLINED"}'
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
            res.send(
             response.body
            );
         //   res.writeHead(302,{'Location':("com.herokuapp.apmanative.androidecorderv2cct://success?token="+req.query.token)});       
    
        });
    });
});

//coming from android
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
                //Non-3DS below code can use used for non 3DS countries and directly deeplink to the app
                // res.redirect("app://com.herokuapp.apmanative.androidecorderv2cct://success?token="+req.query.token+"&PayerID="+PayerID);
              
                //USD-intermidate page for USD currency
               res.redirect('/sucess.html?token='+req.query.token+"&PayerID="+PayerID);
                   } else {
               
                res.redirect('/success.html?token='+""+"&PayerID="+"");   
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




//************************ Order V2 Create BApartner Dec 2019*************************/

router.post('/createBA', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        "description": "Test casual buyer",
        "payer": {
          "payment_method": "paypal"
        },
        "plan": {
          "name": "Lunch",
          "description": "Partner platform fee to sell products",
          "type": "MERCHANT_INITIATED_BILLING",
          "merchant_preferences": {
            "accepted_pymt_type": "Instant",
            "skip_shipping_address": "false",
            "immutable_shipping_address": "true",
            "cancel_url": "http://www.cancel.com",
            "return_url": "http://www.ebay.com"
          }
        },
        "merchant_custom_data": "Platform billing"
      }
        
    ;
    var options = {
        uri: sanboxUrl + '/v1/billing-agreements/agreement-tokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
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



//************************ Order V2 Create partner Dec 2019*************************/

router.post('/captureBA', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        
            "token_id" : req.body.token
        };
    var options = {
        uri: sanboxUrl + '/v1/billing-agreements/agreements',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Request-Id':'abc'+Math.random()*10000000
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
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



//************************ Order V2 Create partner Dec 2019*************************/

router.post('/ordercreatesingleshot', function(req, res) {
    console.log("create order");
    console.log(req.body);
    req.body={
        "intent": "CAPTURE",
        
  
        "purchase_units": [
            {
                "reference_id": "ref_12311124"+Math.random()*100000,
                "description": "Camera Shop",
                "amount": {
                    "currency_code": "USD",
                    "value": "25.00",
                    "breakdown": {
                        "item_total": {
                            "currency_code": "USD",
                            "value": "25.00"
                        },
                        "shipping": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "handling": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "tax_total": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "gift_wrap": {
                            "currency_code": "USD",
                            "value": "0"
                        },
                        "shipping_discount": {
                            "currency_code": "USD",
                            "value": "0"
                        }
                    }
                },
                "payee": {
                    "merchant_id" : "3M5SFHD87UCNA"
                  },
                "items": [
                    {
                        "name": "Levis 501 Selvedge STF",
                        "sku": "5158936",
                        "unit_amount": {
                            "currency_code": "USD",
                            "value": "25.00"
                        },
                        "tax": {
                            "currency_code": "USD",
                            "value": "0.00"
                        },
                        "quantity": "1",
                        "category": "PHYSICAL_GOODS"
                    }
                ],
                
                "shipping": {
                    "address": {
                        "address_line_1": "500 Hillside Street",
                        "address_line_2": "10 Downing Street",
                        "admin_area_1": "LONDON",
                        "admin_area_2": "LONDON",
                        "postal_code": "SW1A 2AA",
                        "country_code": "GB"
                    }
                },
                "shipping_method": "United Postal Service",
                "payment_instruction": {
                    "disbursement_mode": "INSTANT",
                    "platform_fees":[
                       {
                           "amount": {
                         "currency_code":"USD",
                           "value":"1.50"
                         },
                        "payee":{
                             "merchant_id":"DSYARQPV636P6"
                            }
                         }
                    ]
               },
                "payment_group_id": 1,
                "custom_id": "custom_value_123213123"+Math.random()*100000,
                "invoice_id": "123123d1"+Math.random()*1000,
                "soft_descriptor": "Payment Camera Shop"
            }
        ],
        "payment_source": {
            "token": {
            "id": "B-4GT36829SA0527014",
            "type": "BILLING_AGREEMENT"
            }
            },
        "application_context": {
            "brand_name":"mykart",

            
            
            "return_url": "https://pcp-orderv2.herokuapp.com/orderv2/success",

            
            "cancel_url": "https://pcp-orderv2.herokuapp.com/orderv2/success"
        }
    };
    var options = {
        uri: sanboxUrl + '/v2/checkout/orders',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'PayPal-Request-Id':'abc'+Math.random()*10000000
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
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


module.exports = router;