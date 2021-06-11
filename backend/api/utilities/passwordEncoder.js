const bcrypt = require('bcrypt');

const encode = async (password) => {
    return await bcrypt.hash(password, 15)
    .then(hash => {
        return hash;
    })
    .catch(err => {
        return null;
    })
}

module.exports = {
    encode
};