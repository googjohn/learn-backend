/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();

const PORT = 5000;

/* this repo/project will probably focus on routes and middleware */
/* routing >> refers to determining how the application reacts/responds from a request to a specific endpoint/path/URI, specific HTTP request method (get, post, put, delete, patch)
  >> each route can have one or more handler functions commonly called middleware function. these functions are executed when the path matches with the request path/route
*/
// different HTTP methods with the same path '/'
let getRequestCount = 0;
app.get('/', (request, response, next) => {
  getRequestCount++;
  console.log('This is a get response from a get request.');
  response.json({ message: 'Get request received!', requestCount: getRequestCount })
  // console.log('this will not work because we already completed the request-response cycle by sending a response')
  // next(); // without this next() function call the get response contained in the middleware function of the last get request will not be sent and just cause error. if we sent a response before this next function, then this will be ignored and just proceed to other methods and middleware below
})

let putRequestCount = 0;
app.put('/', (request, response) => {
  putRequestCount++;
  console.log('This is an http put method request.')
  response.json({ message: 'Update request received!', requestCount: putRequestCount })
})

let postRequestCount = 0;
app.post('/', (request, response) => {
  postRequestCount++;
  console.log('This is an http post method request.')
  response.json({ message: 'Post request received!', requestCount: postRequestCount })
})

/* app.use('/', (request, response, next) => {
  console.log('This is a use method and nothing else')
  next(); // without using this next() function to continue process other middleware then the methods below this will not be called
})
 */
let deleteRequestCount = 0;
app.delete('/', (request, response) => {
  deleteRequestCount++;
  console.log('This is an http delete method request.');
  response.json({ message: 'Delete request received!', requestCount: deleteRequestCount })
})

// this will not be called because request-response cycle is completed due to sent response from the first get request
app.get('/', (request, response) => {
  console.log('This will be called but no response will be sent because get http method has already sent a response.')
  // console.log('This response will be shown because we did not send a response from the first get request and next function was called')
  response.send(`Hello, your get request was received! No of requests: ${getRequestCount}`)
})


/* middleware >> is a functioin that have access to both request and response object and the next() function to call the next middleware function */

/* app.use() >> this is a method that mounts a middleware function for all incoming requests. you can
  apply middleware at every level from global -- applied to all requests to specific route to a specific HTTP method  */

/* app.use(express.static('public')) >> this is used to server static files that the client requests
  what happens here is for example a client has made a request for styles.css at styles/styles.css,
  this will look for it in the provided directory 'public' and append like public/styles/styles.css and if it finds the files
  then it is automatically served/sent by the express as a response.
*/
// this usage of app.use() tells the script that every .json request is parsed automatically by express
/* app.use(express.json())

app.use((req, res, next) => {
  console.log('This middleware runs for every request.')
  console.log('Initial validation of request')
  // res.send('hello from server')
  next() // if next function is not called then it will block from calling the next middleware or HTTP methods
}) */
/* app.get('/', (req, res) => {
  res.json({ message: 'are you sending to port 5000?' })
}) */
// this will never be called because the above HTTP method has already sent a response so the request-response cycle ended before it reached here unless it is a request to a different route then it will work you go to the route path
/* app.get('/api', (req, res) => {
  res.json({ message: 'hello again from server' })
}) */


// call listen method with logging middleware function to listen to a specific port provided where requests are made
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})

