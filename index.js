const db = require('./lib/db-access');
const inputList = require('./lib/prompts/input-list');
const inputPrompt = require('./lib/prompts/input-prompt');

const options = { 'view all departments':{call:viewAllDepartments }, 
'view all roles': {call:viewAllRoles},
'view all employees':{call:viewAllEmployees},
'add a department':{call:addDepartment},
'add a role':{call:addRole},
'add an employee':{call:addEmployee}};
// const options = [{name:'view all departments', call:viewAllDepartments }, {name:'view all roles', call:viewAllRoles}, 'view all employees', 'add a department', 'add a role'
// ,'add an employee', 'update an employee role'];

// var nameArray = options.map(el =>{
//   return el.name;
// });
// console.log(nameArray);

function showMainOptions(){
  inputList('What would you like to do?', Object.keys(options))
  .then(result => {
    options[result].call();
  }).catch((err) => {
    console.log(err);
  });
}
function delayCall(call){
  setTimeout(call, 100);
}
function viewAllDepartments(){
  db.viewAllDepartments();
  delayCall(showMainOptions);
}
function viewAllRoles(){
  db.viewAllRoles();
  delayCall(showMainOptions);
}
function viewAllEmployees(){
  db.viewAllEmployees();
  delayCall(showMainOptions);
}
function addDepartment(){
  inputPrompt("Enter name of new department").then(departmentName =>{
    db.insertNewDepartment([departmentName]).then(result =>{
      console.log(`${departmentName} is now a department!`);
      delayCall(showMainOptions);
    }).catch(err=>{
      console.log(err);
    });
    
  }).catch(err=>{
    console.log(err);
  });
}
function addRole(){
  inputPrompt("Enter title of new role").then(roleTitle =>{
    inputPrompt("Enter salary for the new role").then(salary =>{
      db.selectAllDepartments().then(allDepartments =>{
        const departmentNames = allDepartments.map(el=>el.name);
        inputList('What Department is it in?', departmentNames)
        .then(department =>{
          for(let i = 0;i<departmentNames.length;i++){
            if(allDepartments[i].name === department){
              db.insertNewRole([roleTitle, salary, allDepartments[i].id]).then(result=>{
                console.log(`${roleTitle} is now a role in the ${department} department!`);
                delayCall(showMainOptions);
              });
            }
          }
        });
      }).catch(err=>console.log(err));
      
    });
    
  }).catch(err=>{
    console.log(err);
  })
}
function addEmployee(){
  inputPrompt("Enter employee first-name").then(firstName =>{
    inputPrompt("Enter employee last-name").then(lastName =>{
      db.selectAllRoles().then(allRoles =>{
        const roleNames = allRoles.map(el=>el.title);
        inputList('What is their role?', roleNames).then(roleTitle=>{
          const roleID = allRoles[roleNames.indexOf(roleTitle)].id;
          db.selectAllEmployees().then(allEmployees =>{
            const employeeNames = allEmployees.map(el=>`${el.first_name} ${el.last_name}`);
            employeeNames.unshift("None");
            inputList('Does this employee have a manager?', employeeNames).then(employeeName =>{
              const index = employeeNames.indexOf(employeeName) - 1;
              let managerID = null
              if(index >= 0)
                managerID = allEmployees[index].id;
              
              db.insertNewEmployee([firstName, lastName, roleID, managerID]).then(result=>{
                console.log(result);
                console.log(`${firstName} ${lastName} is now an employee!`);
                delayCall(showMainOptions);
              });
            });
          });
        });
      })
    });
  }).catch(err=>{
    console.log(err);
  })
}

showMainOptions();