require('dotenv').config()
var express = require('express')
var auth=require('./modules/v1/auth/route')
var app=express()

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.use('/',require('./middlware/validation').user_language);
app.use('/',require('./middlware/validation').validate_api_key);


app.use(auth)

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')



app.listen(process.env.port, function(err,res){
    console.log(" Server is Running on : " + process.env.port );
})  