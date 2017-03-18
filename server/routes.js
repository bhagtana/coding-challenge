var router = require('express').Router();
var path = require('path');
var fs = require('fs');
var rp = require('request-promise');
var PNGImage = require('pngjs-image');


router.get('/', function(req, res) {
	var array = [];
	rp('https://www.random.org/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new').then(function(respond) {
		array.push(respond);
		array = array[0].replace('\n', ',');
		console.log('This was the respond', array)
	})




	// var image = PNGImage.createImage(100, 300);
	// console.log(image.getWidth());
	// console.log(image.getHeight());

	// image.setAt(20, 30, { red:255, green:0, blue:0, alpha:100 });
	 
	// // Get index of coordinate in the image buffer 
	// var index = image.getIndex(20, 30);
	 
	// // Print the red color value 
	// console.log(image.getRed(index));
	 
	// // Get low level image object with buffer from the 'pngjs' package 
	// var pngjs = image.getImage();
	 
	// image.writeImage('/', function (err) {
	//     console.log('Written to the file');
	// });

})
module.exports = router;