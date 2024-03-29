const mysql = require('mysql2');
const departments = require("./json/department");
const roles = require("./json/role");
const employees = require("./json/employee");

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'x3svxbxbM!LXyYw',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);
const sql = 'INSERT INTO department (name) VALUES ?';
db.query(sql, [departments], (err, result)=>{
  if(err)
    console.log(err);

  console.log(result);
});
const roleSQL = 'INSERT INTO role (title, salary, department_id) VALUES ?';
db.query(roleSQL, [roles], (err, result)=>{
  console.log(result);
});
console.log(employees());
const employeeInsertSQL = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?';
db.query(employeeInsertSQL, [employees()], (err, result)=>{
  console.log(result);
});


db.query(`SELECT * FROM department`, (err, result)=>{
  console.table(result);
});
db.query(`SELECT * FROM role`, (err, result)=>{
  console.table(result);
});
db.query(`SELECT * FROM employee`, (err, result)=>{
  console.table(result);
});