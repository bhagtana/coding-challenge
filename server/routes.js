var router = require('express').Router();
var path = require('path');
var fs = require('fs');
var rp = require('request-promise');


router.get('/', function(req, res) {
	var array = [];
	rp('https://www.random.org/integers/?num=10&min=1&max=6&col=1&base=10&format=plain&rnd=new').then(function(respond) {
		array.push(respond);
		array = array[0].replace('\n', ',');
		console.log('This was the respond', array)
	})

//   res.json('Hello from Sunny');
})
module.exports = router;


/*
let generators = ['strings' , 'sequences' , 'integers' , 'quota'];

app.get('/' ,(req , res)=>{

    let generatorType  = req.query['use'];
    if(!generatorType){
        buildResponse(res , 500 ,`Expected 'use' in query string`);
        return
    }
    if(!generators.includes(generatorType)) {
        buildResponse(res , 500 ,`Generator:'${generatorType}' is not supported`);
        return
    }
    let newQuery = Object.assign({} ,req.query);
    delete newQuery['use'];
    newQuery = querystring.stringify(newQuery);
    
    console.log(`https://www.random.org/${generatorType}/?${newQuery}`);
    request(`https://www.random.org/${generatorType}/?${newQuery}`, (err , response , body)=>{
      let status = response.statusCode;
      if(status !== 200){
          buildResponse(res , 500 ,`Could not intercept www.random.org`);
          return
      }
       response.on('end', e => buildResponse(res , 200 , 'Sucsess' , body));
       let data = function(callback){
        
        return {
            integers:function(d){
                d = d.split(/\n/g).map(e => e.trim()).filter(e => e && e.length).map(e => parseInt(e));
                typeof callback === 'function' && callback(d);
            },
            sequences:function(d){
                typeof callback === 'function' && callback(d);
            },
            strings:function(d){
                typeof callback === 'function' && callback(d);
            },
            quota:function(d){
                typeof callback === 'function' && callback(d);
            }
        }   
       }
       data(createBitmap)[generatorType](body);

    });
    
    //request.end();    
});

function createBitmap(randInt){
    console.log(randInt)
    let i = 0;
    let len = randInt.length;
    let j = 0;
    let width = 128;
    let umap = new Uint8Array();
    let buf = new Buffer(randInt);
    // buf
    // fs.writeFile('test.bmp' , buf , function(err){
    //     console.log(err)
    // });
    for(; i < len; i++){
        //buf.write(randInt[i].toString())
        // for(; j < len; j++){
        
        // }
    }
    let test = bmp.encode({width:128, height:128, data:buf});
    console.log(test);
    fs.writeFile('test.bmp', test.data)
}

*/