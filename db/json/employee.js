module.exports = function(){
  const employees = [];
  
  employees.push(makeEntry(1));
  employees.push(roleWithManager(2, 1));
  employees.push(roleWithManager(2, 1));
  employees.push(makeEntry(3));
  employees.push(roleWithManager(4, 4));
  employees.push(makeEntry(5));
  employees.push(roleWithManager(6, 6));
  employees.push(makeEntry(7));
  employees.push(roleWithManager(8, 8));


  return employees;
} 
function roleWithManager(roleID, managerID){
  return [getRandomFromArray(first_names), getRandomFromArray(last_names), roleID.toString(), managerID.toString()];
}
function makeEntry(roleID){
  return [getRandomFromArray(first_names), getRandomFromArray(last_names), roleID.toString(), null];
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