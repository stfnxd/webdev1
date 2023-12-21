const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    port: "3307",
    user: "Line",
    password: "Line123",
    database: "tilbudsmodul"
})

const promisePool = pool.promise();

const execute = async (query, values) => {
  const [rows, fields] = await promisePool.execute(query, values);
  return rows;
};

module.exports = {
  execute
};


/*pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('MySQL Database is connected successfully');
      connection.release(); // release the connection
    }
  });

pool.query(`select * from tilbudsmodul.bergninger`, (error, res)=>{
    return console.log(res)
});*/

