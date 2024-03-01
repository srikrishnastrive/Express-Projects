const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/***
 * The line app.use(bodyParser.json()); is used in Express.js to enable parsing of JSON-encoded data in the request body.

Here's what it does:

Middleware Attachment: app.use() is an Express middleware function that mounts the specified middleware function or functions at the specified path. In this case, it attaches the bodyParser.json() middleware to all routes in the application.

Body Parsing: bodyParser.json() is a middleware provided by the body-parser package. It parses incoming request bodies in JSON format and makes them available under the req.body property.

By adding bodyParser.json() as middleware, you're telling Express to parse JSON data sent in the request body and make it available for further processing within your route handlers.

Without this middleware, you wouldn't be able to access JSON data sent in the request body using req.body, and you'd have to manually parse the JSON data yourself.
 */

app.use(bodyParser.json());

app.use(bodyParser.text())
app.use(bodyParser.urlencoded());

const port = 3000;


function m1(req,res,next){
    console.log("Inside middleware at m1");
    // next();
    // return res.json({msg:'not ok'}); // this will stop the middleware and the next month
    console.log("req.user inside m1",req.user);
   

    req.user = {id:1,email:'s@s.com'};
    next();
    console.log("next function of m1",);
}

function m2(req,res,next){
    
    console.log("Inside middleware at m2");
    console.log("Req.user Inside m2",req.user);
    
  
    next();
    //after next it will jump to the next() function
    //after completing the call back of m1 like function it will go for m2,the response after it will complete the function.
    console.log("next function of m1",);
}



//routing
app.get('/home', m1,m2,(req, res,) => {
   console.log("home called");
   
    console.log(req.url);
    console.log(req.query);
    return res.json({msg:"hello Srikrishna"});

});

app.get("/products/:product_id/rating/:rate",(req,res) => {
    // :id is variable and product is static,
    // :id is part your url params and overrall these kind of routes are called as dynamic routes
    console.log(req.params);
    const pid = req.params.product_id;
    const rate = req.params.rate;

   
    return res.json({productId: pid,rating:rate});
})


//http://localhost:3000/search?q=laptop&category=electronics&page=1
app.get("/search", (req, res) => {
    const query = req.query.q; 
    console.log(req.query.q);
    // Extract the value of the 'q' query parameter
    const category = req.query.category; // Extract the value of the 'category' query parameter
    const page = req.query.page; // Extract the value of the 'page' query parameter

    // Perform some logic based on the query parameters
    // For example, search for items based on the query and category, and paginate the results

    // Respond with a JSON object containing the query parameters
    res.json({ query: query, category: category, page: page });
});

/***
 * app.get("/search", ...) defines a route handler for GET requests to the path /search.
Inside the route handler function (req, res) => { ... }, 
req.query is an object containing key-value pairs of the query parameters.
const query = req.query.q; extracts the value of the q query parameter.
const category = req.query.category; extracts the value of the category query parameter.
const page = req.query.page; extracts the value of the page query parameter.
You can then perform any required logic based on these query parameters, 
such as searching for items or filtering results.
Finally, the route responds with a JSON object containing the extracted query parameters.
So, if you make a GET request to a URL like /search?q=laptop&category=electronics&page=1, 
the code will extract these query parameters and respond with JSON like { "query": "laptop", "category": "electronics", "page": "1" }.


 */



//request body

app.post('/body',(req,res) => {
    console.log(req.body);

    return res.json({msg:"hello"});
})

app.listen(port, ()=> {
    console.log("express server started listening ",port);
})