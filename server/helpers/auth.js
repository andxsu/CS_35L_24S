const {xxHash32} = require("js-xxhash");

const hashPassword = (password) => {
    const seed = 4;
    return xxHash32(password.toString(), seed).toString();
}

const comparePassword = (password, hashed) => {
    return password === hashed;
}

module.exports = {
    hashPassword,
    comparePassword
}