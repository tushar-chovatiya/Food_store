var mysql=require('mysql')

const con = mysql.createConnection({
    host:process.env.database_host,
    user:process.env.database_user,
    password:process.env.database_password,
    database:process.env.database_name,

})

module.exports = con