/* Modules used */
var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080; 

/* Global variables */
var listingData, server;



var requestHandler = function(request, response) {
	//reads the url and looks at request
  var parsedUrl = url.parse(request.url).pathname;
  //tests to see if the parsedUrl is /listings with it
  console.log(parsedUrl);


  //if url contains "/listings", then the request is to look at the listings.json file information
  if(parsedUrl == '/listings'){
    response.write(listingData);
    response.end();
  	
  }
  //throw a 404 error if "/listings" is not within the url, so no data can be read
  else{
  	response.writeHead(404, {'Content-Type': 'text/plain'});
  	response.write('Data requested cannot be found!\n');
  	response.end();
  }
  
};



fs.readFile('listings.json', 'utf8', function(err, data) {
     listingData = data;
     server = http.createServer(requestHandler);

   server.listen(port, function(){
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);
   });

     console.log("Server Started!");
   
});

