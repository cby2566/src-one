const mysql=require('mysql');

var pool  = mysql.createPool({
    host     : '10.3.141.101',
    user     : 'root',
    password : 'abc',
    port: 3306,
    database: 'ugoshop'
});

exports.query = sql=>{
    return new Promise((resolve,reject)=>{
        pool.query(sql,(error,rows)=>{
            let data;
            if(error){
                data={
                    status: 0,
                    data: error
                }
                reject(data);
                return;
            }
            data={
                status: 1,
                data: rows
            }
            resolve(data);
        });
    });
}