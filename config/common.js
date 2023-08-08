var con = require('./con')
var nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

var  common ={

        send_mail:function (to_email,subject,message,callback){
                    
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: process.env.host_email,
                    pass: process.env.host_email_password
                    }
                });
                
                var mailOptions = {
                    from: process.env.host_email,
                    to: to_email,
                    subject: subject,
                    html: message
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                        callback(false)
                    } else {
                        console.log('Email sent: ' + info.response);
                        callback(true)
                    }
            })
        },

        login_signup_token: function(request,user_id,callback){
            
            var token = uuidv4() 

            console.log("com1",token);
            
            con.query("SELECT * from tbl_user_device_info  where user_id = ? ",[user_id],function(error, result) {
                
                if (!error && result.length > 0 ) {

                    con.query("update tbl_user_device_info set token = ? WHERE user_id = ?",[token,user_id], function (error, result) { 
                        if(!error){
                            callback(token)
                        }else{
                            callback(null)  
                        }
                    })

                }else{
                    console.log("com0",token);

                    var device_data={
                        user_id:user_id,
                        token:token,
                        device_type:request.device_type,
                        device_token:request.device_token,
                    }
                    con.query("insert into  tbl_user_device_info  set ? ",[device_data], function(error, result){
                        if (!error){
                            console.log("com1",token);

                            callback(token)
                            
                        }else{
                            callback(null)                              
                        }
                    })
                }
            })
        },

        random_otp: function(){
            // return Math.floor(1000 + Math.random() * 9000);
            return '0000';
        },
}

module.exports = common