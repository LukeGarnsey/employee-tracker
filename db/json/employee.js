const roles = require("./role");
module.exports = () =>{
  const temp = [];
  for(let i = 0;i<22;i++){
    temp.push([makeEntry()]);
  }
  return [];
} 


function makeEntry(){
  return [getRandomFromArray(first_names), getRandomFromArray(last_names),
  getRandomFromArray(roles.length) + 1];
}
function getRandomFromArray(array){
  return array[getRandomNumber(array.length)];
}
function getRandomNumber(length){
  return Math.floor(Math.random()*length)
}

const first_names=["John", "Sarah", "Ashley", "Cris", "Zack", "Luke", "Josh","Corbin",
"Sam", "Joshephine", "Gretta", "Trish", "Samantha", "Karen", "Angela", "Hunter",
"Travis", "Greg", "Lauren", "Barb", "Sophia", "Edward", "Leo", "Luigi", "Max", "Lina", 
"Jack", "Terra", "Drew", "Beth"];

const last_names=["Smith", "Duela", "Chamsky", "Asther", "Etrisha", "Bully", "Carpenter",
"Mailor", "Rockston", "Olderish", "Zapisky", "Xavier", "Visna", "Ballerio", "Strong",
"Sailor", "Armen", "Lucano", "Mulder", "Stone", "Numen", "Caller", "Duncan", "Fuller",
"Kelp"];