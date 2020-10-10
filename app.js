// jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
require("dotenv").config();

const app = express();

app.use(express.static("public")); // relative address
app.use(bodyparser.urlencoded({extended:true}));
const apiKey=process.env.API_KEY;
const url = process.env.URL; 

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  var fname = req.body.fname ;
  var lname = req.body.lname;
  var email = req.body.email ;

  var data = {
    members:[
      {
        email_address : email ,
        status: "subscribed",
        merge_fields : {
          FNAME : fname,
          LNAME : lname
        }
      }
    ]
  };

var jsonData = JSON.stringify(data);

var options = {
        
 url: url,
  method: 'POST',
  headers: {
    'Authorization' : apiKey,
  
} ,
  body: jsonData
};

request(options,function(error,response,body){
  if(error){
  console.log(error);
  res.sendFile(__dirname + "/failure.html");
}
  else {
//console.log("status : ",response.statusCode);

  if(response.statusCode===200){
    res.sendFile(__dirname + "/success.html");
  }
else {
  res.sendFile(__dirname + "/failure.html");

}
}
});

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen( process.env.PORT  || 3000,function(){
  console.log("Server is running at port 3000");
});



