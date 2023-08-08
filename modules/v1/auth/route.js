
    var express = require('express')
    var con = require('../../../config/con')
    var auth = require('./model')
    const multer  = require('multer')
    const path = require('path')
    var validate =require('../../../middlware/validation')
    const { t } = require('localizify');

    var router = express.Router();


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, '../user_place_api/public/user')
        },
        filename: function (req, file, cb) {
        cb(null,Date.now() + path.extname(file.originalname))
        }
    })
    
    // upload multiple image

    const upload_palce_img = multer({ 
        storage: storage,
        limits: {fileSize: 12 * 1024 * 1024}
    })

    const upload_multi = upload_palce_img.fields([
        {
            name: 'profile_image',
            maxCount: 5
        }
    ])

    router.post('/place_image',function(req,res){
        upload_multi(req,res, function(error){

            if (!error) {
                validate.data_response(req,res,"1","Upload sucessfully")            
            } else {
                validate.data_response(req,res,"0","Upload failed",error)   
            }
        })
    })

    // upload single image
    const upload_user_img = multer({ 
        storage: storage,
        limits: {fileSize: 12 * 1024 * 1024}
    }).single('profile_img');

    router.post('/addimage',function(req,res){
        upload_user_img(req,res, function(error){

            if (!error) {
                validate.data_response(req,res,"1","Upload sucessfully")            
            } else {
                validate.data_response(req,res,"0","Upload failed",error)   
            }
        })
    })


    // user login api
    router.post('/user_login',function(req,res){

        var request = req.body

        var schema = {
            email:'required|email',
            password:'required|min:6',
        }
        var message = {
            required:' Please Enter :attr ',
            min:'Min length is 6 for :attr'
        };
        if (validate.dataValidate(res,request,schema,message)) {

            auth.user_login(request, function(code,message,data){
                validate.data_response(req,res,code,message,data)
            })
        }
    })


    // forgot password api
    router.post('/reset_password',function(req,res){

        var request = req.body
        var schema = {
            email:'required|email',
        }
        var message = {
            required:' Please Enter :attr ',
            min:'Min length is 6 for :attr'
        }
        if (validate.dataValidate(res,request,schema,message)) {

            auth.forgot_password(req, function(code,message,data){
                validate.data_response(req,res,code,message,data)
            })
        }
    })


    // forgot form load
    router.get('/forgot_password/:email/:token',function(req,res){
        res.render(__dirname + '/forgot.html')
    })


    // forgot password api update
    router.post('/forgot_password/:email/:token',function(req,res){

        var request = req.body
        var schema = {
            password:'required',
            confirm_password:'required',
        }
        var message = {
            required:' Please Enter :attr ',
        };
        if (validate.dataValidate(res,request,schema,message)) {
            auth.reset_pass_update(req, function(code,message,data){
                validate.data_response(request,res,code,message,data)
            })
        }
    })

    //user location to all palce distance in KM 
    router.get('/user_location/:id',function(req,res){
        auth.user_place_location(req, function(code,message,data){
            validate.data_response(req,res,code,message,data)
        })
    })


    // signup user
    router.post('/signup',function(req,res){

        var request = req.body

        var schema = {
            email:'required|email',
            name:'required|min:3',
            password:'required',
            longitude:'',
            latitude:'',
            social_id:'',
            mobile_no:'',
            device_type:'required',
            device_token:'required'  
        }
        
        var message = {
            required:' Please Enter :attr ',
            min:'Min length is 3 for :attr',
            email:'Please Enter valid :attr'
        };

        if (validate.dataValidate(res,request,schema,message)) {

            auth.signup_user(request, function(code,message,data){
                validate.data_response(req,res,code,message,data)
            })

        }
    })


    // verify otp
    router.post('/verify_otp',function(req,res){

        var request = req.body 
        var schema = {
            email:'required|email'
        }

        var message = {
            required:' Please Enter :attr ',
        }; 
        if (validate.dataValidate(res,request,schema,message)) {

                auth.email_otp_verify(request, function(code,message,data){
                    validate.data_response(req,res,code,message,data)
                })
            }
    })



    // update user info
    router.put('/update/user/',function(req,res){

        var request = req.body

        var schema = {
            id:'required|integer',
            name:'min:3',
            email:'email',
            password:'',
            profile_img:'',
            about:'',
            longitude:'',
            latitude:''
        }
        var message = {
            required:' Please Enter :attr ',
            min:'Min length is 3 for :attr',
            integer:':attr Value should be Integer only'
        };

        if (validate.dataValidate(res,request,schema,message)) {

            auth.update_user_details(request, function(code,message,data){
                validate.data_response(req,res,code,message,data)       
            })
        }
    })



    // update place info
    router.put('/update/place/',function(req,res){

        var request = req.body

        var schema = {
            id:'required|integer',
            name:'',
            location:'',
            longitude:'',
            latitude:'',
            about:'',
            remove_image_id:'',
            images:'',
        }
        var message = {
            required:' Please Enter :attr ',
            integer:':attr Value should be Integer only'
        };

        if (validate.dataValidate(res,request,schema,message)) {

            auth.edit_place(request, function(code,message,data){
                validate.data_response(req,res,code,message,data)       
            })
        }else{
            validate.data_response(res,code,message,data)
        }
    })

    // delete user
    router.delete('/delete/user/:id',function(request,res){
        auth.delete_user(request, function(code,message,data){
            validate.data_response(request,res,code,message,data)
        })
    })


    //all menu
    router.get('/home',function(req,res){
        auth.all_menu(req, function(code,message,data){
            validate.data_response(req,res,code,message,data)
        })
    })

    //menu details 
    router.get('/details/:id',function(req,res){
        auth.menu_details(req, function(code,message,data){
            validate.data_response(req,res,code,message,data)
        })
    })

    // delete  all details of place with images also
    router.delete('/delete/place/:id',function(request,res){

        auth.delete_place(request, function(code,message,data){
            validate.data_response(request,res,code,message,data)
        })
    })



    // add place 
    router.post('/addplace',function(req,res){
        var request = req.body

        var schema = {
            user_id:'required|integer',
            name:'required|min:3',
            location:'required',
            longitude:'required',
            latitude:'required',
            about:'',
            images:'required'
        }
        var message = {
            required:' Please Enter :attr ',
            min:'Min length is 3 for :attr'
        };

        if (validate.dataValidate(res,request,schema,message)) {
            auth.place_add(request, function(code,message,data){
                validate.data_response(req,res,code,message,data)
            })
        }
    })



    // place rating
    router.post('/place/rate/:id',function(req,res){

        var request = req.body

        var schema = {
            user_id:'required',
            rating:'required'   
        }
        var message = {
            required:' Please Enter :attr ',
        };
        if (validate.dataValidate(res,request,schema,message)) {
            auth.rate_place(req, function(code,message,data){
                validate.data_response(request,res,code,message,data)
            })
        }

    })



    // place review
    router.post('/place/review/:id',function(req,res){

        var request = req.body

        var schema = {
            user_id:'required',
            review:'required'   
        }
        var message = {
            required:' Please Enter :attr ',
        };
        if (validate.dataValidate(res,request,schema,message)) {
            auth.review_place(request, function(code,message,data){
                validate.data_response(request,res,code,message,data)
            })
        }

    })



    module.exports = router