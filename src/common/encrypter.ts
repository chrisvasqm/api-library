import bcrypt from 'bcrypt';

const encrypter = async function (password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export default encrypter;