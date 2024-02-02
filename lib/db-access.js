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
const selectAllDepartments = () =>new Promise((resolve, reject) => {
  db.query(`SELECT * FROM department`, (err, result)=>{
    if(err){
      reject(err);
    }else
      resolve(result);
  });
});
const selectAllRoles = () =>new Promise((resolve, reject) => {
  db.query(`SELECT * FROM role`, (err, result)=>{
    if(err){
      reject(err);
    }else
      resolve(result);
  });
});
const selectAllEmployees = () =>new Promise((resolve, reject) => {
  db.query(`SELECT * FROM employee`, (err, result)=>{
    if(err){
      reject(err);
    }else
      resolve(result);
  });
});
const viewAllDepartments = () => {
  db.query(`SELECT name as Department_Name FROM department`, (err, result)=>{
    console.log("");
    console.table(result);
    console.log("");
  });
}
const viewAllRoles = () => {
  db.query(`SELECT title as Title, d1.name as Department, salary as Salary FROM role join department d1 on d1.id = role.department_id`, (err, result)=>{
    console.log("");
    console.table(result);
    console.log("");
  });
}
const insertDepartmentQuery = 'INSERT INTO department (name) VALUES ?';
const insertNewDepartment = (entry) => new Promise((resolve, reject) => {
  db.query(insertDepartmentQuery, [[entry]], (err, results)=>{
    if(err)
      reject(err)
    else
      resolve(results);
  });
});
const insertRoleQuery = 'INSERT INTO role (title, salary, department_id) VALUES ?';
const insertNewRole = (entry) => new Promise((resolve, reject) => {
  
  db.query(insertRoleQuery, [[entry]], (err, results)=>{
    if(err)
      reject(err)
    else
      resolve(results);
  });
});
const insertEmployeeQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?';
const insertNewEmployee = (entry) => new Promise((resolve, reject)=>{
  db.query(insertEmployeeQuery, [[entry]], (err, results)=>{
    if(err)
      reject(err)
    else
      resolve(results);
  });
})
const empWithManagerQuery = `SELECT
concat(e1.first_name,' ',e1.last_name) AS Employee_Name,
r1.title AS Title, d1.name as Department, r1.salary as Salary,
concat(e2.first_name,' ',e2.last_name) AS Manager_Name
FROM
employee e1
JOIN
role r1 ON e1.role_id = r1.id
JOIN
department d1 ON d1.id=r1.department_id
LEFT JOIN
employee e2 ON e1.manager_id = e2.id
LEFT JOIN
role r2 ON e2.role_id = r2.id;`
const viewAllEmployees = () => {
  db.query(empWithManagerQuery, (err, result)=>{
    console.log("");
    console.table(result);
    console.log("");
  });
}


module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees,
  selectAllDepartments, selectAllRoles, selectAllEmployees, 
  insertNewRole, insertNewDepartment, insertNewEmployee};