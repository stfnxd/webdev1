
var mysql = require('mysql2')

var con = mysql.createConnection({
    host: "localhost",
    port: "3307",
    user: "Line",
    password: "Line123",
    database: "tilbudsmodul"
})


con.connect (function(err){
    if(err) throw err;
    console.log("Connected");
    var sql="INSERT INTO leasingkøretøj (id, mærke, model, årgang) VALUES ?";
    var VALUES=[
        ['4', 'Toyota', 'noget', '1999']
    ] 
    con.query(sql,[VALUES], function(err,result){
        if (err) throw err;
        console.log("records inserted:"+result.affectedRows)
    })
})

con.query(`select * from tilbudsmodul.bergninger`, (err, res)=>{
    return console.log(res)
})