var request = require('request');
var sanboxUrl = 'https://api.sandbox.paypal.com';
//var clientId = "AcuuDiWgApKeQx7oY6wuGh2kbAIzy8B1NrruTzVl_vn3Dqv7a-EYGKlHRMb70fjc3eX3EP5rlM3VUp8g"; //india-business
//var secret = "ELxGTdUhk3gGuO7nFv1sDF5waqAsUcKDoA0djtfIYgGVIXEjealGQvq93-vdWsc8rvHnNVOfeNdvngWE";

var clientId = "AU4kkD6HuzjSwSkixUsqtYGnKY8bO_jIZHD4aXzBToRLxc6hjnFSbem0sNkSdY5QLBvREwDvKarxd37x"; //india-business
var secret = "EOCUuRbasKUZFq_t5kBayCZMHqKR_ubWJQAFjlkfBlo0eb9jz5i58mU0WCVE8e1EWX2UGn6Kov78eaW_";


//var clientId = "AR3WHPkVA79FpEwmhq3aob9_J7EvfYF6Gdb2e3nEeANvh_KZDVkNLaK9ZvPvEbVx7rP8YJ4kXNbOQ1Bo"; //direct merchants.
//var secret = "EIqdzP0LAryj8wYGNs1FRLhqkM4mbaoHBu6H-RvSo5sAws4PrFw321N82FNlYYfODqXgp0CNpIYBZhUP";

//var clientId = "AZAkV7r-EVQzp5JWbU75Xmr0jMTmL3mZfOr4gt4BlfU1ojjBqnV4EfRNHh9SZcqkcuH5o-fv2aEQqIa8"; //vAULT DIRECT merchants.
//var secret = "EFU7q9BiRAyp0aHUZrNYORP3GjJkFNm2vTjA1bqC29zI5QN7gpXlEOAiVHmsDDS3mo60WyjnSX0qsy3-";



//var clientId = "AcuuDiWgApKeQx7oY6wuGh2kbAIzy8B1NrruTzVl_vn3Dqv7a-EYGKlHRMb70fjc3eX3EP5rlM3VUp8g"; //india-business
//var secret = "ELbUAWIe3URTwQheSzllCnJ6qoUnfKCxFz9IjtTJrpwrcjNv1lZQUJIFlJjZ7u1RHM-yFrmdRSvuC-cs";





var basicAuth = new Buffer(clientId+":"+secret).toString('base64') ;

var initialize = function(){  
    var options = {
        uri: sanboxUrl + '/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+basicAuth,
            //'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiVk1SS1hEUkJEQVZBVSIsImlhdCI6MTU4MTU5MDk5NX0.'
          //  'PayPal-Auth-Assertion':'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJBVTRra0Q2SHV6alN3U2tpeFVzcXRZR25LWThiT19qSVpIRDRhWHpCVG9STHhjNmhqbkZTYmVtMHNOa1NkWTVRTEJ2UkV3RHZLYXJ4ZDM3eCIsInBheWVyX2lkIjoiWjhDQkJZSDg2S1gzQyIsImlhdCI6MTU4MTkxNzk3MH0.'
       
        },
        body: "grant_type=client_credentials&response_type=token&return_authn_schemes=true"
            
    }; 
    return new Promise(function(resolve, reject) { 
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                reject(err);
            }
            var access_token = JSON.parse(response.body).access_token; 
            console.log(access_token);
            resolve(access_token);
        });
    });
};

module.exports = initialize;