var validator =require('Validator')
const {default:localizify} = require('localizify');
const { t } = require('localizify');

 
const en = require('../language/en');
const fr = require('../language/fr');
const sp = require('../language/sp');


var validations = {

    
    dataValidate: function(res,request,schema,message){

        const v = validator.make(request,schema,message);

        if (v.fails()) {
            const errors = v.getErrors();

            for (var i in errors) {
                var error = errors [i][0];
                break;
            }
            var response_data={
                code: '0',
                message: error,
            }
            res.status(200)
            res.send(response_data)
            
            return false;

        }else{
            return true;
        }
    },

    data_response: function(req,res,code,message,data){

        this.getMessage(req.lang,message,function(translated_message){

            if(data == null){
                var response_data={
                    code: code,
                    message: translated_message
                }
                res.status(200)
                res.send(response_data)
            }else{
                var response_data={
                    code: code,
                    message: translated_message,
                    data:data
                }
                res.status(200)
                res.send(response_data)
            }  
        })      
    },
    getMessage: function (language,keyword,callback) {
        localizify
            .add('en', en)
            .add('fr', fr)
            .add('sp', sp)
            .setLocale(language);

        callback(t(keyword));
    },

    user_language: function(req,res,callback){
        var language =(req.headers['accept-language'] !=undefined && req.headers['accept-language'] !="" ) ? req.headers['accept-language'] :'en';
        req.lang = language

        localizify
            .add('en', en)
            .add('fr', fr)
            .add('sp', sp)
            .setLocale(language);
        callback()
    },
    validate_api_key: function (req,res,callback) {
        var header_api =(req.headers['api-key'] !=undefined && req.headers['api-key'] !="" ) ? req.headers['api-key'] :'';

        if (header_api != "" && header_api == process.env.api_key) {
            callback();
        } else {
            var response_data={
                code: 0,
                message:"Inavlid api key",
            }
            res.status(401)
            res.send(response_data)
        }
    }
}

module.exports= validations