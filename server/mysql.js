var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
    database: 'db_lug',
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
});

function executeQuery(sql) {
    return new Promise((resolve, reject) => {
        conn.query(sql, function (err, results) {
            if (err) reject(err);
            resolve(results);
        })
    })
}

function executeUpdateQuery(sql, data) {
    return new Promise((resolve, reject) => {
        conn.query(sql, data, function (err) {
            if (err) reject(err);
            resolve(true);
        })
    })
}

function checkIsExist(table, fieldName, id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM ${table} WHERE ${fieldName}='${id}'`;
        conn.query(sql, function (err, results) {
            if (err) reject(err);
            resolve(results.length > 0 ? true : false);
        })
    })
}


module.exports = { conn, executeQuery, executeUpdateQuery, checkIsExist };
