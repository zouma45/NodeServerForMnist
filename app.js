var express = require('express');
var morgan = require('morgan'); // loads the piece of middleware for logging
//var favicon = require('serve-favicon'); // loads the piece of middleware for the favicon
var fs = require('fs');
var PNG = require('pngjs').PNG;
var imageMatrix = Create2DArray(28) ;

var png = new PNG({
    width: 28,
    height:  28,
    //filterType: -1
});
var app = express();

    util = require("util");

var mime = require("mime");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var PythonShell = require('python-shell');
var result ; 



app.use(morgan('combined')) // loads the piece of middleware for logging
.use(express.static(__dirname + '/public')) // Specifies that the /public folder includes static files (basic piece of middleware loaded)

app.post('/mnist', function (req, res) {

	var recu = req.body.image ; 
	var array = JSON.parse(recu);





var options = {
  args: [array]
};
  	    
    PythonShell.run('MnistPred.py', options,function (err , results) {


    		res.send("{\"prediction\":\" " + results[results.length-1] + "\" }");
    		//console.log(result);
    

  if (err) {
  				res.send("{\"prediction\":\" " + "Error" + "\" }");

  }

  result = ""
  //console.log('finished');
});


// 		var q= 0 ;


	
// 	for (var y = 0; y < png.height; y++) {
//     for (var x = 0; x < png.width; x++) {

//     	imageMatrix[x][y]= array[q] ; 

// 		q++ ;


//     }}
	


// 		var idx=0 ; 

// 	for (var y = 0; y < png.height; y++) {
//     for (var x = 0; x < png.width; x++) {
        
//         png.data[idx  ] = 255 - imageMatrix[x][y];
//         png.data[idx+1] = 255 -imageMatrix[x][y];
//       	png.data[idx+2] = 255 -imageMatrix[x][y];
//         png.data[idx+3] = 255 ; ///imageMatrix[x][y];

//         idx +=  4 ;
        
//     }

// }

// png.pack().pipe(fs.createWriteStream('newOut.png'));

});




app.listen(8080);





function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}


