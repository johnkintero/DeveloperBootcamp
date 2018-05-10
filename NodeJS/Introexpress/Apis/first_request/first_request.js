console.log('Hello');
var request = require('request');
/*request('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if(error){
        console.log('error:', error); // Print the error if one occurred
    } else {
        console.log('body:', body); // Print the HTML for the Google homepage.
    }
});
*/
request('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (!error && response.statusCode == 200) {
      // se parsea ya que lo quese recibe es un string
      var parsedData = JSON.parse(body);
      console.log(parsedData['query']['results']);
    }
});
