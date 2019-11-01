// jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public")); // relative address
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  var fname = req.body.fname ;
  var lname = req.body.lname;
  var email = req.body.email ;
console.log(fname,lname,email);
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
  //host : "us20.api.mailchimp.com",
//  path : "/3.0/lists/9c496dcd2d/members ",
 url:'https://us20.api.mailchimp.com/3.0/lists/9c496dcd2d' ,
  method: 'POST',
  headers: {
    'Authorization' : 'prabhat 409a103a65fee59e6c88b4d532c01870-us20',
  //  'Content-Type' : "application/json",
  //  'Content-Length' : jsonData.length
},
  body: jsonData
};

request(options,function(error,response,body){
  if(error){
    console.log("prabhat");
  console.log(error);

  res.sendFile(__dirname + "/failure.html");
}
  else
console.log("status : ",response.statusCode);
{


  // console.log(body);
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


// api key
//409a103a65fee59e6c88b4d532c01870-us20

// list id
// 9c496dcd2d
