
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
   const firstName=req.body.fname;
   const lastName=req.body.lname;
   const email=req.body.email;
  
    const data={
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
            }   
        ]
    };
   
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0//lists/4755a61673";
    const options={
        method:"POST",
        auth:"binod:3087e0082fdd01ed7792d5ebe6e4d882-us21"
        };
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});






app.listen(3000,function(){
    console.log("Server is runningat 3000");
});

//APki Key 3087e0082fdd01ed7792d5ebe6e4d882-us21
// aduince id 4755a61673