var con = require('../../../config/con')
var global=require('../../../config/constant')
var asyncLoop = require('node-async-loop');
var common = require('../../../config/common');
var wel_come= require('../../../config/welcom_template')
var login_warn= require('../../../config/login_template')
var forgot= require('../../../config/forgot')
var otpTemp= require('../../../config/otp')

const { v4: uuidv4 } = require('uuid');
const { use } = require('./route');


var auth = {

    
    user_login: function(request,callback){

            con.query("SELECT u.*,IFNULL(tdi.token,'') as token,IFNULL(tdi.device_type,'') as device_type, IFNULL(tdi.device_token,'') as device_token  from tbl_user u LEFT JOIN tbl_user_device_info tdi on u.id = tdi.user_id where u.email = ? AND u.password = ? AND u.is_active=1 AND u.is_delete=0;",[request.email,request.password],function (error, result) {
            
                if (!error && result.length > 0 ) {
                
                    let user_info = result[0]
                    login_warn.login_template(request,function(loginTemplate){

                        common.send_mail(request.email,"login_email_message",loginTemplate,function(isSent){
                            if(isSent) {

                                common.login_signup_token(request,user_info.id,function(token){
                                    user_info.token = token
                                    callback('1',"user_login_message",{user_info})                                         
                                })
                            } else {
                                callback('0',"error_message",null) 
                            }
                        })
                    })
                }
                else{ 
                    callback('0',"credential_message") 
                }
            })
        
    },

    forgot_password: function(request,callback){

        var token = uuidv4()
            
        con.query("SELECT * from tbl_reset_password where email = ? ",[request.body.email],function (error, result) {
            
            if (!error && result.length > 0 ) {
                var data={
                    token:token,
                    is_active:'1'
                }
                con.query("update tbl_reset_password set ? WHERE email = ?",[data,request.body.email], function (error, result) { 
                    if(!error){
                    
                        con.query("select * from tbl_reset_password tr where tr.email = ? AND tr.is_active = 1",[request.body.email],function (error, result) {
            
                            if (!error && result.length > 0) {

                                var info =result[0];

                                forgot.forgot_template(info,function(forgotTemplate){
                                    common.send_mail(request.body.email,"Forgot Password Email",forgotTemplate,function(isSent){
                                        if (isSent) {
                                             callback('1',"forgot_email_success",{})                                         
                                        }
                                    })
                                })   
                            }
                        })
                    }
                })
            }else{
                var data={
                    email:request.body.email,
                    token:token,
                    is_active:'1'
                }
                con.query("insert into  tbl_reset_password  set ? ",[data], function(error, result){
                    if (!error){

                        con.query("select * from tbl_reset_password tr where tr.email = ? AND tr.is_active = 1",[request.body.email],function (error, result) {
                            if (!error && result.length > 0) {
                                var info =result[0];
                                
                                forgot.forgot_template(info,function(forgotTemplate){
                                    common.send_mail(request.body.email,"Forgot Password Email",forgotTemplate,function(isSent){
                                        if (isSent) {
                                             callback('1',"forgot_email_success",{})                                         
                                        }
                                    })
                                })
                            }
                        })
                    
                    }
                })
            }
        })
    },


    reset_pass_update: function(request,callback){

        con.query("SELECT * from tbl_reset_password where token = ? AND is_active = 1",[request.params.token],function (error, result) {
            console.log(result);
            if (!error && result.length > 0) {
                callback('0',"token_error_message",null) 
            }else{
                con.query("update tbl_user set password = ? where email = ?",[request.body.password,request.params.email], function (error, result) { 
                    if(!error){

                        con.query("update tbl_reset_password set is_active = 0 where email = ? ",[request.params.email],function (error, result) {
                
                            if (!error && result.length > 0) {
                               callback('1',"forgot_password_success",{result}) 
                                
                            }else{
                                callback('0',"error_message",{error}) 

                            }
                        })
                    }
                })
            }
        })
    },
   


    user_place_location: function(request,callback){
    
        auth.user_check(request, function(userExsits){
            if (userExsits) {
                
                con.query("SELECT u.id,p.*, ( 6371 * ACOS( COS(RADIANS(u.latitude)) * COS(RADIANS(p.latitude)) * COS( RADIANS(p.longitude) - RADIANS(u.longitude) ) + SIN(RADIANS(u.latitude)) * SIN(RADIANS(p.latitude)) ) ) AS Distance_From_The_User FROM tbl_user u, tbl_place p WHERE u.id = ? and p.is_active=1 and p.is_delete=0 ORDER BY Distance_From_The_User;",[request.params.id],function (error, result) {
                    
                    if (!error && result.length > 0) {
                        callback('1',"place_near_message",{result})
                    }
                    else{ 
                        callback('0',"user_exsits_error_message")
                    }
                })

            }else{
                callback('0',"error_message",{error})               
            }
        })
    },

    delete_user: function(request,callback){

        con.query("delete from tbl_user where id = '"+request.params.id+"' ", function (error, result) {
            if(!error){
                callback('1',"user_remove_message",{})
            }
           else{
                callback('0',"error_message",{error}) 
            }
        })
    },


    email_otp_verify: function (request, callback) {

        auth.email_check(request, function(inuse){
            if (inuse) {
                callback('0',"email_register_error_message",{})
            }else{
                
                var otp = common.random_otp();
                otpTemp.otp(request,function(otptemplate){
                    common.send_mail(request.email,"otp verification",otptemplate,function(isSent){
                        if (isSent) {
                            callback('1',"here is your otp",otp) 
                        } else {
                            callback('0',"error_message",null) 
                        }
                    })
                }) 

            }
        })
        
    },

    signup_user: function (request, callback) {
        
        auth.email_check(request, function(inuse){
            if (inuse) {
                callback('0',"email_register_error_message",{})
            }else{

                var obj =  {
                    name:request.name,
                    email:request.email,
                    password:request.password,
                    longitude:(request.longitude != undefined) ? request.longitude:'0.0',
                    latitude:(request.latitude != undefined) ? request.latitude:'0.0',
                    email_verification:'verified',
                }

                

                con.query("insert into tbl_user set ?", [obj], function(error, result){
                    if (!error) {
                       
                        var u_id = result.insertId
                        auth.user_details(u_id, function(user_info){
                            if(user_info == null){
                                callback('0',"none",null)          
                            }else{

                                wel_come.welcome(request,function(welcomeTemplate){
                                    common.send_mail(request.email,"welcome_email_message",welcomeTemplate,function(isSent){
                                        if (isSent) {

                                            common.login_signup_token(request,u_id,function(token){
                                                user_info.token = token
                                                callback('1',"user_register_message",user_info)                                         
                                            })

                                        } else {
                                            callback('0',"error_message",null) 
                                        }
                                    })
                                })                                                                 
                            }
                        })
                    }else {
                        callback('0',"error_message",{error}) 
                    }
                })
            }
        })
        
    },



    update_user_details: function(request,callback){

        auth.edit_email_check(request, function(inuse){

            if (inuse) {
                callback('0',"email_register_error_message", {})
            }else{

                    var obj =  {
                        name:request.name,
                        email:request.email,
                        mobile_no:request.mobile_no,
                        password:request.password,
                        longitude:request.longitude,
                        latitude:request.latitude,
                    }

                    for ( i in obj) {
                        if (obj[i] == null) {
                            delete obj[i];
                        }
                    }

                    con.query("update tbl_user set ? where id = ?",[obj,request.id], function (error, result) { 
                        if(!error){

                            auth.user_details(request.id, function(user_info){
                                if(user_info == null){
                                    callback('0',"error_message", null) 
                                }else{
                                    callback('1',"user_data_update_message",{user_info}) 
                                }
                            })
                        }
                        else{
                            callback('0',"error_message",{error}) 
                        }
                    })
            }
        })
    },

    user_details: function(u_id,callback){
        
        con.query("SELECT u.*, IFNULL(tdi.token,'') as token,IFNULL(tdi.device_type,'') as device_type, IFNULL(tdi.device_token,'') as device_token from tbl_user u LEFT JOIN tbl_user_device_info tdi on u.id=tdi.user_id where  u.id =? AND u.is_delete = 0",[u_id],function (error, result) {

            if (!error ) {
                callback(result) 
            }
            else{ 
                callback(result) 
           }
        })
    },

    email_check: function (request, callback) {
        con.query("select * from tbl_user where email = ? AND is_delete = 0 ", [request.email], function(error, result){
            if (!error && result.length > 0) {
                callback(true)
            }
            else {
                callback(false)
            }
        })
    },
    

   edit_email_check: function (request,callback) {
        con.query("select * from tbl_user where id !=? AND email = ? AND is_delete = 0 ", [request.id,request.email], function(error, result){
            if (!error && result.length > 0) {
                callback(true)
            }
            else {
                callback(false)
            }
        })  
    },



    all_menu: function(request,callback){
        con.query("select * from tbl_menu m where m.is_active = 1 AND m.is_delete = 0",function (error, result) {
            
            if (!error && result.length > 0) {
                callback('1',"menu is retrived",{result})
            }
            else{ 
                callback('0',"error_message",{error}) 
           }
        })
    },

    menu_details: function(request,callback){

        con.query("select * from tbl_menu_details m where menu_id =? AND  m.is_active = 1 AND m.is_delete = 0",[request.params.id],function (error, result) {
            
            if (!error && result.length > 0) {
                callback('1',"menu details retrived",{result})
            }
            else{ 
                callback('0',"error_message",{error}) 
           }
        })
    },


    place_add: function (request, callback) {

        auth.user_check(request, function(userExsits){
            if (userExsits) {
                callback('0',"user_exsits_error_message",{})
            }else{

                var images=  request.images

                var obj =  {
                    user_id:request.user_id,
                    name:request.name,
                    location:request.location,
                    longitude:request.longitude,
                    latitude:request.latitude,
                    about:request.about
                }

                con.query("insert into tbl_place set ?", [obj], function(error, result){
                    if (!error) {
                        var p_id = result.insertId

                        for(let i = 0; i < images.length; i++){
                            con.query('insert into tbl_place_images set images=?,place_id=?',[images[i],p_id],function (error, result) {
                                if (!error) {

                                    auth.place_details(p_id, function(place_info){
                                                    
                                        if(place_info == null){
                                            callback('0',"error_message", null) 
                                        }else{
                                            callback('1',"place_added_message", place_info) 
                                        }
                                    })
                                }
                            })
                        }
                    }else {
                        callback('0',"error_message",{error}) 
                    }
                })
            }
        })
            
    },

    delete_place: function(request,callback){

        con.query("delete from tbl_place where id = '"+request.params.id+"' ", function (error, result) {
            if(!error){

                con.query('DELETE FROM tbl_place_images WHERE place_id = ?',[request.params.id],function(error, result){
                    if (!error) {
                        callback('1',"place_remove_message",{}) 
                                                     
                    }else{
                        callback('0',"error_message", null) 
                    }
                 })
            }
           else{
                callback('0',"error_message",{error}) 
            }
        })
    },


    edit_place: function(request,callback){

            var images =  request.images
            
            var obj =  {
                name:request.name,
                location:request.location,
                longitude:request.longitude,
                latitude:request.latitude,
                about:request.about
            }

            for ( i in obj) {
                if (obj[i] == null) {
                    delete obj[i];
                }
            }

            con.query("update tbl_place set ? where id = ?",[obj,request.id], function (error, result) { 
                if(!error){

                    auth.remove_place_image(request, function(isReomved){
                        if (isReomved) {

                                for(let i = 0; i < images.length; i++){

                                    con.query("insert into tbl_place_images set images = ?, place_id=? ",[images[i],request.id],function (error, result) {
                                        if (!error) {

                                            auth.place_details(request.id, function(place_info){

                                                if(place_info == null){
                                                
                                                callback('0',"error_message", null) 
                                                }else{
                                                    callback('1',"place_data_update_message", place_info) 
                                                }
                                            })
                                        }else{
                                            callback('0',"error_message", error) 
                                        }
                                    })
                                }

                        }else{
                            callback('0',"error_message", null) 
            
                        }
                    })
                }
                else{
                    callback('0',"error_message",{error}) 
                }
            })    
    },

    rate_place: function (request,callback) {
        auth.user_check(request, function(userExsits){
            if (userExsits) {
                var obj =  {
                    user_id:request.body.user_id,
                    place_id:request.params.id,
                    rating:request.body.rating  
                }
                con.query("insert into tbl_place_rating set ?", [obj], function(error, result){
                    if (!error) {
                        callback('1',"place_rate_success",{})
                    }else{
                        callback('0',"error_message",{})
                    }
                })
            }else{
                callback('0',"user_exsits_error_message",{})
            }
        })       
    },


    review_place: function (request,callback) {

        auth.user_check(request, function(userExsits){
            if (userExsits) {

                var obj =  {
                    user_id:request.body.user_id,
                    place_id:request.params.id,
                    review:request.body.review  
                }
                con.query("insert into tbl_place_review set ?", [obj], function(error, result){
                    if (!error) {
                         callback('1',"place_review_success",{})
                    }else{
                        callback('0',"error_message",{})

                    }
                })
            }else{
                callback('0',"user_exsits_error_message",{})
            }
        })
    },



    place_details: function(p_id,callback){

        con.query("SELECT * from tbl_place  where  id =?",[p_id],function (error, result) {

            let place_data = result[0]

            if (!error ) {
                con.query("SELECT * from tbl_place_images where place_id = ?",[p_id],function (error, result) {
                    if (!error && result.length > 0) {
                        place_data.images = result
                        callback(place_data)
                    }else{
                        place_data.images = "image_error_message";
                        callback(place_data)
                    }
                })
            }
            else{ 
                callback('0',"error_message",{error}) 
           }
        })
    },

    user_check: function(request,callback){

        con.query("SELECT * from tbl_user where id = ?",[request.user_id],function (error, result) {
            if (!error && result.length > 0){
                callback(false)
            }else{
                callback(true)
            }
        })
    },

    remove_place_image:function(request,callback){

        if (request.remove_image_id != undefined && request.remove_image_id != '') {

            asyncLoop(request.remove_image_id,function(item,next){
                con.query("delete from tbl_place_images where id=?",[item],function(error,result){
                    next();
                })
            
            },function(){
                callback(true)
            })
        } else {
            callback(true)
        }
    }
}

module.exports = auth
