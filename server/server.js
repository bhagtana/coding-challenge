let express = require("express");
let bodyParser = require('body-parser');
let https = require("https");
let http = require("http");
let bmp = require("bmp-js");
let tonegenerator = require("tonegenerator");
let querystring = require("querystring");
let request = require('request');
let fs = require('fs');

let app = express();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

// app.use('/api/', routes);
// app.use(express.static(path.join(__dirname, '../public')));

let buildResponse = (res , statusCode ,msg, data = {}) => {
  data.msg = msg;
  res.statusCode = statusCode;
  let d = JSON.stringify(data);
  res.setHeader('Content-Type','application/json');
  res.setHeader('Content-Length',d.length);
  res.end(d);
}

let server = http.createServer(app);
app.use(bodyParser.json());

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
       res.end()

    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});


function createBitmap(randInt){
    console.log(randInt)
    let i = 0;
    let len = randInt.length;
    let j = 0;
    let width = 128;
    let arr = [];
    
    for(; i < width; i++){
        // if(i > 0 && i % 3 === 0 && i < len){
        //     let R = randInt[i - 2];
        //     let G = randInt[i - 1];
        //     let B = randInt[i];
        //     arr.push([R,G,B]);
        // }
        for(; j < width; j++){
            arr.push(Math.floor(255 + Math.random() * 100));

        }
        
    }
    
    let buf = new Buffer(arr);
    console.log(arr);
    let test = bmp.encode({data:buf , width:128, height:128});
    fs.writeFileSync('test.bmp', test , 'binary')
}
function createBitmap(randInt){
    console.log(randInt)
    let i = 0;
    let len = randInt.length;
    let j = 0;
    let width = 128;
    let arr = [];
    let t = new  Uint8ClampedArray(width * width * 4);
    
    for(; i < width; i++){
        // if(i > 0 && i % 3 === 0 && i < len){
        //     let R = randInt[i - 2];
        //     let G = randInt[i - 1];
        //     let B = randInt[i];
        //     arr.push([R,G,B]);
        // }
        for(; j < width; j++){
            let pos = (y + width + x) * 4;
            t[pos] = randInt[i];
            t[pos + 1] = randInt[i + 1];
            t[pos + 2] = randInt[i + 2];
            t[pos + 3] = randInt[i + 2];
        }
    }
    
    let buf = new Buffer(t);
    console.log(arr);
    let test = bmp.encode({data:buf , width:128, height:128});
    fs.writeFileSync('test.png', buf , 'binary') 
}