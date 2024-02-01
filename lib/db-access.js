const mysql = require('mysql2');
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'x3svxbxbM!LXyYw',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const dbViewAllDepartments = () => {
  db.query(`SELECT * FROM department`, (err, result)=>{
    console.log("");
    console.table(result);
    console.log("");
  });
}
const dbViewAllRoles = () => {
  db.query(`SELECT * FROM role`, (err, result)=>{
    console.log("");
    console.table(result);
    console.log("");
  });
}

module.exports = {dbViewAllDepartments, dbViewAllRoles};