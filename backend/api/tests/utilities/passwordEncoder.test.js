const passwordEncoder = require('../../utilities/passwordEncoder.js');

describe('password encoding test', () => {

    it('successful encoding of a non-null password', async() => {

        const password = "password@1";
        const hashPassword = await passwordEncoder.encode(password);
        expect(hashPassword).not.toBe(null);
    })

    it('non-successful encoding of a null password', async() => {

        const password = null;
        const hashPassword = await passwordEncoder.encode(password);
        expect(hashPassword).toBe(null);
    })
})