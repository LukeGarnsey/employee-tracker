const inquire = require('inquirer');

const method = (message, options) => new Promise((resolve, reject)=>{
  inquire.prompt([{
    type:'list',
    name:'option',
    message:message,
    choices: options
  }]).then(answers =>{
    resolve(answers.option);
  }).catch(err=>{
    reject(err);
  });
});


module.exports = method;