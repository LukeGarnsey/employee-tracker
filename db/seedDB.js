const mysql = require('mysql2');
const departments = require("./json/department");
const roles = require("./json/role");
const employees = require("./json/employee");

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);
// const sql = 'INSERT INTO department (name) VALUES ?';
// db.query(sql, [departments], (err, result)=>{
//   if(err)
//     console.log(err);

//   console.log(result);
// });
// const roleSQL = 'INSERT INTO role (title, salary, department_id) VALUES ?';
// db.query(roleSQL, [roles], (err, result)=>{
//   console.log(result);
// });
// console.log(employees());
// const employeeInsertSQL = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?';
// db.query(employeeInsertSQL, [employees()], (err, result)=>{
//   console.log(result);
// });


// db.query(`SELECT * FROM department`, (err, result)=>{
//   console.table(result);
// });
// db.query(`SELECT * FROM role`, (err, result)=>{
//   console.table(result);
// });
// db.query(`SELECT * FROM employee`, (err, result)=>{
//   console.table(result);
// });

//query for selecting employee+role+manager+role
const empWithManagerQuery = `SELECT
e1.first_name AS employee_first_name,
r1.title AS employee_role,
e2.first_name AS manager_first_name,
r2.title AS manager_role
FROM
employee e1
JOIN
role r1 ON e1.role_id = r1.id
JOIN
employee e2 ON e1.manager_id = e2.id
LEFT JOIN
role r2 ON e2.role_id = r2.id;`;
// INNER JOIN role on e1.role_id = role.id 
db.query(empWithManagerQuery,
(err, results)=>{
  console.table(results);
});