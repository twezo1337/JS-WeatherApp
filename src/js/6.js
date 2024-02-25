const stringDate = new Date(1690297200 * 1000);
const date = new Date();
date.setHours(date.getHours() + -14400 / 3600);
stringDate.setHours(stringDate.getHours() + -14400 / 3600);

console.log(stringDate);
//console.log(date.toISOString() <= stringDate.toISOString());

