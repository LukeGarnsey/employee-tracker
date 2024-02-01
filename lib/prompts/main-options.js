const inquire = require('inquirer');

const method = (options) => new Promise((resolve, reject)=>{
  inquire.prompt([{
    type:'list',
    name:'option',
    message:'What would you like to do?',
    choices: options
  }]).then(answers =>{
    resolve(answers.option);
  }).catch(err=>{
    reject(err);
  });
});


module.exports = method;