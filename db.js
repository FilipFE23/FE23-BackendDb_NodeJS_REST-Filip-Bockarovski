const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'GritAcademy',
});

module.exports = {
  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.query(sql, values, (err, results) => {
        if (err) {
          return reject(err);
        };
        return resolve(results);
      });
    });
  }
};