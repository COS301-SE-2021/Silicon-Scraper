const bcrypt = require('bcrypt');

const encode = async (password) => {
    return await bcrypt.hash(password, 12)
    .then(hash => {
        return hash;
    })
    .catch(err => {
        return null;
    })
}

const compare = async(password, hash) => {
    return await bcrypt.compare(password, hash)
    .then(result => {
        return result;
    })
    .catch(err => {
        throw new Error()
    })
}

module.exports = {
    encode,
    compare
};