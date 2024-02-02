const inquire = require('inquirer');

module.exports = (message) => new Promise((resolve, reject) => {
  inquire.prompt([
    {
      type:'input',
      name:'input',
      message:`${message}`
    }
  ])
  .then((answers) => {
      resolve(answers.input);
  })
  .catch(err =>{
    reject(err);
  });
});