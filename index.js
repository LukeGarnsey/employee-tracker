const mysql = require('mysql2');
const inquire = require('inquirer');
const mainOptions = require('./lib/prompts/main-options');
const db = require('./lib/db-access');
// const {dbViewAllDepartments, dbViewAllRoles} = require('./lib/db-access');

const options = { 'view all departments':{call:viewAllDepartments }, 'view all roles': {call:viewAllRoles}};
// const options = [{name:'view all departments', call:viewAllDepartments }, {name:'view all roles', call:viewAllRoles}, 'view all employees', 'add a department', 'add a role'
// ,'add an employee', 'update an employee role'];

// var nameArray = options.map(el =>{
//   return el.name;
// });
// console.log(nameArray);

function showMainOptions(){
  mainOptions(Object.keys(options)).then(result => {
    options[result].call();
  }).catch((err) => {
    console.log(err);
  });
}

function viewAllDepartments(){
  db.dbViewAllDepartments();
  setTimeout(()=>showMainOptions(), 1);
}
function viewAllRoles(){
  db.dbViewAllRoles();
  setTimeout(()=>showMainOptions(), 1);
}

showMainOptions();