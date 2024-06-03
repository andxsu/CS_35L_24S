const {xxHash32} = require("js-xxhash");

let string = "cock n balls";

const hashPassword = (password) => {
    const seed = 4;
    return xxHash32(password.toString(), seed).toString();
}

console.log(hashPassword(string) + "\n");
console.log(string);