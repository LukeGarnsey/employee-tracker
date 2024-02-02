const db = require('./lib/db-access');
const inputList = require('./lib/prompts/input-list');
const inputPrompt = require('./lib/prompts/input-prompt');

const options = { 'view all departments':{call:viewAllDepartments }, 
'view all roles': {call:viewAllRoles},
'view all employees':{call:viewAllEmployees},
'add a department':{call:addDepartment},
'add a role':{call:addRole},
'add an employee':{call:addEmployee},
'update employee':{call:updateEmployee},
'View Department Budget':{call:viewBudget}};

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
          const id = allDepartments[departmentNames.indexOf(department)].id
          db.insertNewRole([roleTitle, salary, id]).then(result=>{
            console.log(`${roleTitle} is now a role in the ${department} department!`);
            delayCall(showMainOptions);
          });
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
function updateEmployee(){
  db.selectAllEmployees().then(allEmployees =>{
    const employeeNames = allEmployees.map(el=>`${el.first_name} ${el.last_name}`);
    inputList('Which employee needs updating?', employeeNames).then(employeeName =>{
      const employeeID = allEmployees[employeeNames.indexOf(employeeName)].id;
      db.selectAllRoles().then(allRoles=>{
        const roleNames = allRoles.map(el=>el.title);
        inputList('What is their new role?', roleNames).then(roleTitle=>{
          const roleID = allRoles[roleNames.indexOf(roleTitle)].id;
          db.updateEmployee(employeeID, roleID).then(result=>{
            console.log(`${employeeName} role updated`);
            delayCall(showMainOptions);
          });
        });
      });
    });
  });
}
function viewBudget(){
  db.selectAllDepartments().then(allDepartments=>{
    const departmentNames = allDepartments.map(el=>el.name);
    inputList('View Budget of Department', departmentNames).then(depName =>{
      const deptID = allDepartments[departmentNames.indexOf(depName)].id;
      db.viewBudget(deptID).then((salaries)=>{
        console.log(`---
Total ${depName} salaries $${salaries}
---`);
        delayCall(showMainOptions);
      });
      
    })
  });
}

showMainOptions();